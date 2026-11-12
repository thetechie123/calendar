import {
  parseTelegramTokenMessage,
  parseIssueStartToIso,
  parseEventTimeToIso,
} from "../src/utils/telegramTokenParser.js";

console.log("\n============================================================");
console.log("RUNNING TELEGRAM TOKEN PARSER & TIMING TEST SUITE");
console.log("============================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failed++;
  }
}

// -------------------------------------------------------------
// 1. TODAY'S ISSUE: Quota Completed @5:25 without AM/PM
// -------------------------------------------------------------
const todayRawMessage = `⏰ 13th November – SSD 10K & DD 2K Tokens Issue Started @ 4:15Pm

🔹 SSD Tokens – Current Status

  ❌  Quota Completed @5:25

🔹 Srivari Mettu Divya Darshan Tokens

  ❌  Quota Completed @5:28

📌 తిరుమల దర్శనం & TTD తాజా అప్డేట్స్ కోసం మా Telegram & WhatsApp Channels ను Follow చేయండి 🙏`;

const parsedToday = parseTelegramTokenMessage(todayRawMessage);
assert(parsedToday !== null, "1A: Today message parsed successfully");
assert(parsedToday.ssd_completed_at_text === "5:25", "1B: SSD completion text extracted as '5:25'");
assert(parsedToday.dd_completed_at_text === "5:28", "1C: DD completion text extracted as '5:28'");
assert(parsedToday.issue_start_text === "4:15Pm", "1D: Issue start extracted as '4:15Pm'");
assert(parsedToday.ssd_status === "completed", "1E: SSD status is 'completed'");
assert(parsedToday.dd_status === "completed", "1F: DD status is 'completed'");

const refToday = "2026-11-12T11:58:36.000Z"; // 17:28:36 IST (5:28 PM)
const todayStart = parseIssueStartToIso({
  indiaDate: "2026-11-12",
  issueStartText: parsedToday.issue_start_text,
  referenceDate: refToday,
});
assert(todayStart === "2026-11-12T10:45:00.000Z", "1G: Today start time is 4:15 PM IST (10:45 UTC)");

const todaySsdCompleted = parseEventTimeToIso({
  indiaDate: "2026-11-12",
  timeText: parsedToday.ssd_completed_at_text,
  referenceDate: refToday,
  issuanceStartedAt: todayStart,
});
assert(
  todaySsdCompleted === "2026-11-12T11:55:00.000Z",
  "1H: Today SSD completion @5:25 without PM resolves to 5:25 PM IST (11:55 UTC), NOT 5:25 AM"
);

const todayDdCompleted = parseEventTimeToIso({
  indiaDate: "2026-11-12",
  timeText: parsedToday.dd_completed_at_text,
  referenceDate: refToday,
  issuanceStartedAt: todayStart,
});
assert(
  todayDdCompleted === "2026-11-12T11:58:00.000Z",
  "1I: Today DD completion @5:28 without PM resolves to 5:28 PM IST (11:58 UTC), NOT 5:28 AM"
);

// Verify completion is after start
assert(
  new Date(todaySsdCompleted) > new Date(todayStart),
  "1J: SSD completion time occurs AFTER issuance start time"
);
assert(
  new Date(todayDdCompleted) > new Date(todayStart),
  "1K: DD completion time occurs AFTER issuance start time"
);

// -------------------------------------------------------------
// 2. CROSS-MIDNIGHT ISSUANCE & COMPLETION
// -------------------------------------------------------------
const midnightRawMessage = `⏰ 31st October – SSD 10K & DD 2K Tokens Issue Started @ 5:30Pm

🔹 SSD Tokens – Current Status

  ❌  Quota Completed @ 12:44Am

🔹 Srivari Mettu Divya Darshan Tokens

  ❌  Quota Completed @ 02:00Am`;

const parsedMidnight = parseTelegramTokenMessage(midnightRawMessage);
const refMidnightMsg = "2026-10-30T20:35:21.000Z"; // 31 Oct 2026, 02:05:21 IST
const midnightStart = "2026-10-30T12:00:00.000Z"; // 30 Oct 2026, 17:30 IST

const midnightSsd = parseEventTimeToIso({
  indiaDate: "2026-10-30",
  timeText: parsedMidnight.ssd_completed_at_text,
  referenceDate: refMidnightMsg,
  issuanceStartedAt: midnightStart,
});
assert(
  midnightSsd === "2026-10-30T19:14:00.000Z",
  "2A: Cross-midnight 12:44Am resolves to 31 Oct 00:44 IST (19:14 UTC Oct 30), NOT 30 Oct 00:44 IST"
);
assert(
  new Date(midnightSsd) > new Date(midnightStart),
  "2B: Midnight SSD completed occurs AFTER 5:30 PM issuance start"
);

const midnightDd = parseEventTimeToIso({
  indiaDate: "2026-10-30",
  timeText: parsedMidnight.dd_completed_at_text,
  referenceDate: refMidnightMsg,
  issuanceStartedAt: midnightStart,
});
assert(
  midnightDd === "2026-10-30T20:30:00.000Z",
  "2C: Cross-midnight 02:00Am resolves to 31 Oct 02:00 IST (20:30 UTC Oct 30), NOT 30 Oct 02:00 IST"
);
assert(
  new Date(midnightDd) > new Date(midnightStart),
  "2D: Midnight DD completed occurs AFTER 5:30 PM issuance start"
);

// -------------------------------------------------------------
// 3. START TIME WITHOUT AM/PM DISAMBIGUATION
// -------------------------------------------------------------
const startWithoutMeridiem = parseIssueStartToIso({
  indiaDate: "2026-11-12",
  issueStartText: "4:15",
  referenceDate: "2026-11-12T10:50:00.000Z", // 16:20 IST
});
assert(
  startWithoutMeridiem === "2026-11-12T10:45:00.000Z",
  "3A: Start '4:15' posted in afternoon resolves to 4:15 PM IST"
);

console.log(`\nTests finished: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
}
