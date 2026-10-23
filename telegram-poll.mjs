import { TelegramClient } from "teleproto";
import { StringSession } from "teleproto/sessions/index.js";
import { createClient } from "@supabase/supabase-js";
import { parseTelegramTokenMessage } from "./src/utils/telegramTokenParser.js";
import fs from "node:fs";

const CHANNEL_USERNAME = "LaxmiTeluguTechChannel";
const SESSION_FILE = ".telegram-session";

const apiId = Number(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH;

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!apiId || !apiHash) {
  throw new Error("Missing Telegram API credentials.");
}

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    "Missing Supabase server environment variables."
  );
}

let sessionString = process.env.TELEGRAM_SESSION?.trim();

if (!sessionString && fs.existsSync(SESSION_FILE)) {
  sessionString = fs.readFileSync(
    SESSION_FILE,
    "utf8"
  ).trim();
}

if (!sessionString) {
  throw new Error(
    "Missing TELEGRAM_SESSION environment variable."
  );
}

const telegramClient = new TelegramClient(
  new StringSession(sessionString),
  apiId,
  apiHash,
  {
    connectionRetries: 5,
  }
);

const supabase = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);

function getIndiaDate(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function parseDarshanDateTextToIsoDate(telegramDate, darshanDateText) {
  if (!darshanDateText) return null;
  const match = darshanDateText.match(/(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)/i);
  if (!match) return null;
  const day = Number(match[1]);
  const monthName = match[2].toLowerCase();
  const months = {
    january: "01", february: "02", march: "03", april: "04", may: "05", june: "06",
    july: "07", august: "08", september: "09", october: "10", november: "11", december: "12"
  };
  const monthStr = months[monthName];
  if (!monthStr) return null;

  const year = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric"
  }).format(telegramDate);

  return `${year}-${monthStr}-${String(day).padStart(2, "0")}`;
}

function parseIssueStartToIso(indiaDate, issueStartText) {
  if (!indiaDate || !issueStartText) {
    return null;
  }

  const match = issueStartText
    .trim()
    .match(
      /^(\d{1,2})(?:[:.](\d{2}))?\s*(AM|PM)?$/i
    );

  if (!match) {
    return null;
  }

  let hour = Number(match[1]);
  const minute = Number(match[2] || 0);
  const meridiem = match[3]?.toUpperCase();

  if (meridiem === "PM" && hour !== 12) {
    hour += 12;
  }

  if (meridiem === "AM" && hour === 12) {
    hour = 0;
  }

  if (
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return null;
  }

  const [year, month, day] =
    indiaDate.split("-").map(Number);

  // India Standard Time = UTC + 05:30.
  const utcMillis =
    Date.UTC(
      year,
      month - 1,
      day,
      hour,
      minute,
      0
    ) -
    (5 * 60 + 30) * 60 * 1000;

  return new Date(utcMillis).toISOString();
}

function parseEventTimeToIso(indiaDate, timeText) {
  if (!indiaDate || !timeText) {
    return null;
  }

  const match = timeText
    .trim()
    .match(/^(\d{1,2})(?:[:.](\d{2}))?\s*(AM|PM)?$/i);

  if (!match) {
    return null;
  }

  let hour = Number(match[1]);
  const minute = Number(match[2] || 0);
  const meridiem = match[3]?.toUpperCase();

  if (meridiem === "PM" && hour !== 12) {
    hour += 12;
  }

  if (meridiem === "AM" && hour === 12) {
    hour = 0;
  }

  if (
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return null;
  }

  const [year, month, day] =
    indiaDate.split("-").map(Number);

  // India Standard Time = UTC + 05:30.
  const utcMillis =
    Date.UTC(
      year,
      month - 1,
      day,
      hour,
      minute,
      0
    ) -
    (5 * 60 + 30) * 60 * 1000;

  return new Date(utcMillis).toISOString();
}

/**
 * Find the highest Telegram message ID that has already
 * been imported into token_observations.
 */
async function getLastImportedTelegramMessageId() {
  const { data, error } = await supabase
    .from("token_observations")
    .select("source_reference")
    .eq("source_type", "telegram")
    .not("source_reference", "is", null);

  if (error) {
    throw error;
  }

  let highestMessageId = 0;

  for (const row of data || []) {
    const match = String(
      row.source_reference
    ).match(/^telegram:(\d+)$/);

    if (!match) {
      continue;
    }

    const messageId = Number(match[1]);

    if (
      Number.isInteger(messageId) &&
      messageId > highestMessageId
    ) {
      highestMessageId = messageId;
    }
  }

  return highestMessageId;
}

async function processMessage(message) {
  const text = message.message || "";

  if (!text.trim()) {
    return "ignored";
  }

  const parsed = parseTelegramTokenMessage(text);

  if (!parsed) {
    return "ignored";
  }

  const sourceReference =
    `telegram:${message.id}`;

  console.log(
    `\nRecognized token message ${message.id}`
  );

  const telegramDate = message.date
    ? new Date(message.date * 1000)
    : new Date();

  const messageIndiaDate =
    getIndiaDate(telegramDate);

  const telegramHourIST = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: false
    }).format(telegramDate)
  );

  const targetDarshanDate = parseDarshanDateTextToIsoDate(
    telegramDate,
    parsed.darshan_date_text
  );

  // If the message arrived in the early morning (past midnight, 0-6 AM IST)
  // but pertains to an issuance that started the previous evening (e.g. 5:30 PM),
  // the issuance date is the previous calendar day.
  let effectiveIssuanceDate = messageIndiaDate;
  const isStartInEvening =
    parsed.issue_start_text && /PM/i.test(parsed.issue_start_text);

  if (isStartInEvening && telegramHourIST < 8) {
    const prevDay = new Date(telegramDate.getTime() - 24 * 60 * 60 * 1000);
    effectiveIssuanceDate = getIndiaDate(prevDay);
  }

  console.log(
    `Telegram India date: ${messageIndiaDate}, Effective issuance date: ${effectiveIssuanceDate}, Target darshan date: ${targetDarshanDate || "N/A"}`
  );

  let tokenDay = null;

  // 1. If target darshan date was extracted, search by darshan_date first to prevent midnight splitting
  if (targetDarshanDate) {
    const { data: byDarshan, error: darshanErr } = await supabase
      .from("token_days")
      .select("*")
      .eq("darshan_date", targetDarshanDate)
      .maybeSingle();

    if (darshanErr) throw darshanErr;
    if (byDarshan) {
      tokenDay = byDarshan;
      console.log(`Matched existing token day ${tokenDay.id} by darshan_date ${targetDarshanDate}`);
    }
  }

  // 2. Search by effectiveIssuanceDate
  if (!tokenDay) {
    const { data: byEffective, error: effErr } = await supabase
      .from("token_days")
      .select("*")
      .eq("issuance_date", effectiveIssuanceDate)
      .maybeSingle();

    if (effErr) throw effErr;
    if (byEffective) {
      tokenDay = byEffective;
      console.log(`Matched existing token day ${tokenDay.id} by effective issuance date ${effectiveIssuanceDate}`);
    }
  }

  // 3. Search by messageIndiaDate
  if (!tokenDay && effectiveIssuanceDate !== messageIndiaDate) {
    const { data: byDate, error: dateErr } = await supabase
      .from("token_days")
      .select("*")
      .eq("issuance_date", messageIndiaDate)
      .maybeSingle();

    if (dateErr) throw dateErr;
    if (byDate) {
      tokenDay = byDate;
      console.log(`Matched existing token day ${tokenDay.id} by message India date ${messageIndiaDate}`);
    }
  }

  const issuanceStartedAt =
    parseIssueStartToIso(
      effectiveIssuanceDate,
      parsed.issue_start_text
    );

  const ssdCompletedAt =
    parseEventTimeToIso(
      effectiveIssuanceDate,
      parsed.ssd_completed_at_text
    );

  const ddCompletedAt =
    parseEventTimeToIso(
      effectiveIssuanceDate,
      parsed.dd_completed_at_text
    );

  /*
   * If today's token day does not exist, create it.
   */
  if (!tokenDay) {
    console.log(
      `No token day found for ${effectiveIssuanceDate}. Creating it automatically...`
    );

    let darshanDate = targetDarshanDate;

    if (!darshanDate) {
      const nextDay = new Date(`${effectiveIssuanceDate}T12:00:00`);
      nextDay.setDate(nextDay.getDate() + 1);
      darshanDate = [
        nextDay.getFullYear(),
        String(nextDay.getMonth() + 1).padStart(2, "0"),
        String(nextDay.getDate()).padStart(2, "0"),
      ].join("-");
    }

    const {
      data: createdTokenDay,
      error: createError,
    } = await supabase
      .from("token_days")
      .insert({
        issuance_date: effectiveIssuanceDate,
        darshan_date: darshanDate,
        issuance_status: "active",
        ssd_quota: parsed.ssd_quota || null,
        dd_quota: parsed.dd_quota || null,
        ssd_status: parsed.ssd_status === "completed" ? "completed" : "active",
        dd_status: parsed.dd_status === "completed" ? "completed" : "active",
        issuance_started_at: issuanceStartedAt,
        source_type: "telegram",
        source_reference: sourceReference,
        notes: "Automatically created from Telegram token issuance message.",
      })
      .select("*")
      .single();

    if (createError) {
      throw createError;
    }

    tokenDay = createdTokenDay;

    console.log(
      `Created token day ${tokenDay.id} for issuance ${effectiveIssuanceDate} (darshan: ${darshanDate}).`
    );
  }

  /*
   * Save issuance start time / quotas / completion timestamps if newly discovered
   */
  const timingUpdate = {};

  if (issuanceStartedAt && !tokenDay.issuance_started_at) {
    timingUpdate.issuance_started_at = issuanceStartedAt;
  }

  if (ssdCompletedAt && !tokenDay.ssd_completed_at) {
    timingUpdate.ssd_completed_at = ssdCompletedAt;
  }

  if (ddCompletedAt && !tokenDay.dd_completed_at) {
    timingUpdate.dd_completed_at = ddCompletedAt;
  }

  if (parsed.ssd_quota && (!tokenDay.ssd_quota || tokenDay.ssd_quota === 0)) {
    timingUpdate.ssd_quota = parsed.ssd_quota;
  }

  if (parsed.dd_quota && (!tokenDay.dd_quota || tokenDay.dd_quota === 0)) {
    timingUpdate.dd_quota = parsed.dd_quota;
  }

  if (Object.keys(timingUpdate).length > 0) {
    timingUpdate.source_type = "telegram";
    timingUpdate.source_reference = sourceReference;

    const { data: updatedTokenDay, error: timingUpdateError } =
      await supabase
        .from("token_days")
        .update(timingUpdate)
        .eq("id", tokenDay.id)
        .select("*")
        .single();

    if (timingUpdateError) {
      throw timingUpdateError;
    }

    tokenDay = updatedTokenDay;
    console.log("Token timing/quota information saved:", timingUpdate);
  }

  /*
   * Issue-start message without remaining counts is recorded as start time
   */
  if (
    parsed.issue_start_text &&
    parsed.ssd_remaining === null &&
    parsed.dd_remaining === null &&
    parsed.ssd_status === "unknown" &&
    parsed.dd_status === "unknown"
  ) {
    console.log(
      `Issue-start message processed: ${sourceReference}`
    );

    return "inserted";
  }

  /*
   * Normal SSD/DD observation.
   */
  const observation = {
    token_day_id: tokenDay.id,
    observed_at: message.date
      ? new Date(message.date * 1000).toISOString()
      : new Date().toISOString(),
    ssd_remaining: parsed.ssd_remaining,
    dd_remaining: parsed.dd_remaining,
    ssd_status: parsed.ssd_status,
    dd_status: parsed.dd_status,
    source_type: "telegram",
    source_reference: sourceReference,
    raw_text: parsed.raw_text,
  };

  console.log(
    "Attempting insert:",
    {
      source_reference: sourceReference,
      observed_at: observation.observed_at,
      ssd_remaining: observation.ssd_remaining,
      dd_remaining: observation.dd_remaining,
      ssd_status: observation.ssd_status,
      dd_status: observation.dd_status,
    }
  );

  const { error: insertError } = await supabase
    .from("token_observations")
    .insert(observation);

  if (insertError) {
    if (insertError.code === "23505") {
      console.log(
        `Duplicate prevented by database: ${sourceReference}`
      );
      return "duplicate";
    }

    throw insertError;
  }

  console.log(
    `SUCCESS — inserted ${sourceReference}`
  );

  /*
   * Update SSD/DD status for the token day.
   * Note: We NEVER set issuance_status = 'completed' because the database
   * has a check constraint CHECK (issuance_status IN ('active', 'no_issuance')).
   * Individual quotas are tracked via ssd_status and dd_status.
   */
  const dayStatusUpdate = {};

  if (parsed.ssd_status === "completed" || parsed.ssd_status === "active") {
    dayStatusUpdate.ssd_status = parsed.ssd_status;
  }

  if (parsed.dd_status === "completed" || parsed.dd_status === "active") {
    dayStatusUpdate.dd_status = parsed.dd_status;
  }

  if (parsed.ssd_status === "completed" && !tokenDay.ssd_completed_at) {
    dayStatusUpdate.ssd_completed_at = ssdCompletedAt || new Date(message.date * 1000).toISOString();
  }

  if (parsed.dd_status === "completed" && !tokenDay.dd_completed_at) {
    dayStatusUpdate.dd_completed_at = ddCompletedAt || new Date(message.date * 1000).toISOString();
  }

  if (Object.keys(dayStatusUpdate).length > 0) {
    const { error: statusUpdateError } = await supabase
      .from("token_days")
      .update(dayStatusUpdate)
      .eq("id", tokenDay.id);

    if (statusUpdateError) {
      throw statusUpdateError;
    }

    console.log("Token day status updated:", dayStatusUpdate);
  }

  return "inserted";
}

async function runPoll(channel) {
  console.log(
    `\n[${new Date().toISOString()}] Starting Telegram poll...`
  );

  const nowIST = new Date();
  const todayIndiaDate = getIndiaDate(nowIST);

  const lastImportedMessageId =
    await getLastImportedTelegramMessageId();

  console.log(
    `Last imported Telegram message ID: ${lastImportedMessageId}`
  );

  const messages =
    await telegramClient.getMessages(
      channel,
      {
        limit: 500,
      }
    );

  console.log(
    `Recent Telegram history fetched: ${messages.length}`
  );

  /*
   * Process messages from the last 48 hours (today & yesterday IST)
   * to guarantee no token messages are missed even if GitHub Actions
   * cron execution is delayed.
   */
  const yesterdayIST = new Date(nowIST.getTime() - 24 * 60 * 60 * 1000);
  const yesterdayIndiaDate = getIndiaDate(yesterdayIST);

  const recentMessages = messages.filter((message) => {
    if (!message.date) return false;
    const messageIndiaDate = getIndiaDate(new Date(message.date * 1000));
    return (
      messageIndiaDate === todayIndiaDate ||
      messageIndiaDate === yesterdayIndiaDate
    );
  });

  console.log(
    `Recent 48h Telegram messages: ${recentMessages.length}`
  );

  const recognizedMessages = [];

  for (const message of recentMessages) {
    const text = message.message || "";

    if (!text.trim()) {
      continue;
    }

    const parsed = parseTelegramTokenMessage(text);

    if (!parsed) {
      continue;
    }

    recognizedMessages.push(message);
  }

  recognizedMessages.sort(
    (a, b) => a.id - b.id
  );

  console.log(
    `Recognized token messages: ${recognizedMessages.length}`
  );

  let inserted = 0;
  let duplicates = 0;
  let other = 0;

  for (const message of recognizedMessages) {
    const result = await processMessage(message);

    if (result === "inserted") {
      inserted++;
    } else if (result === "duplicate") {
      duplicates++;
    } else {
      other++;
    }
  }

  console.log(
    "\n========================================"
  );
  console.log(
    "Telegram poll complete."
  );
  console.log("Inserted:", inserted);
  console.log("Duplicates:", duplicates);
  console.log("Other:", other);
  console.log(
    "========================================"
  );
}

console.log("========================================");
console.log("Telegram SSD/DD Token Cron Poll");
console.log("========================================");

try {
  console.log("Connecting to Telegram...");

  await telegramClient.connect();

  console.log("Telegram connected.");

  const channel = await telegramClient.getEntity(
    CHANNEL_USERNAME
  );

  console.log("Channel:", {
    id: String(channel.id),
    title: channel.title,
    username: channel.username,
  });

  await runPoll(channel);
} catch (error) {
  console.error("Telegram cron poll failed:", error);
  process.exitCode = 1;
} finally {
  try {
    await telegramClient.disconnect();
  } catch (disconnectError) {
    console.error(
      "Failed to disconnect Telegram cleanly:",
      disconnectError
    );
  }
}

console.log("Telegram cron poll finished.");
