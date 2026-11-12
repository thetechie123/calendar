/**
 * Parse SSD/DD token information from a Telegram channel message.
 *
 * Handles messages such as:
 *
 * SSD & DD Tokens Issue Started @ 12:30Am
 *
 * SSD Tokens – Current Status
 *     Quota Completed @ 2:10Am
 *
 * Srivari Mettu Divya Darshan Tokens
 *     Quota Completed @ 2:50Am
 *
 * Also handles availability updates such as:
 *
 * SSD Tokens – Current Status:
 *     Available Tokens: 7966
 *
 * Srivari Mettu Divya Darshan Tokens:
 *     Available Tokens: 1707
 */

export function parseTelegramTokenMessage(rawText) {
  if (!rawText || typeof rawText !== "string") {
    return null;
  }

  const text = rawText
    .replace(/\r/g, "")
    .replace(/[–—−]/g, "-")
    .replace(/[â€“â€”âˆ’]/g, "-")
    .trim();

  /*
   * Make sure this looks like an SSD/DD token message.
   */
  const isTokenMessage =
    /SSD\s*&\s*DD\s+Tokens/i.test(text) ||
    /SSD\s+Tokens\s*-\s*Current\s*Status/i.test(text) ||
    /Srivari\s+Mettu\s+Divya\s+Darshan\s+Tokens/i.test(text);

  if (!isTokenMessage) {
    return null;
  }

  /*
   * Extract the SSD section only.
   *
   * The section ends when the DD / Srivari Mettu section begins.
   */
  const ssdSectionMatch = text.match(
    /SSD\s+Tokens\s*-\s*Current\s*Status\s*:?\s*([\s\S]*?)(?=Srivari\s+Mettu\s+Divya\s+Darshan\s+Tokens|$)/i
  );

  /*
   * Extract the DD section only.
   */
  const ddSectionMatch = text.match(
    /Srivari\s+Mettu\s+Divya\s+Darshan\s+Tokens\s*:?\s*([\s\S]*)$/i
  );

  const ssdSection = ssdSectionMatch
    ? ssdSectionMatch[1]
    : "";

  const ddSection = ddSectionMatch
    ? ddSectionMatch[1]
    : "";

  /*
   * Extract current SSD availability.
   */
  const ssdAvailableMatch = ssdSection.match(
    /Available\s+Tokens\s*:\s*([\d,]+)/i
  );

  /*
   * Extract current DD availability.
   */
  const ddAvailableMatch = ddSection.match(
    /Available\s+Tokens\s*:\s*([\d,]+)/i
  );

  const ssd = ssdAvailableMatch
    ? Number(
        ssdAvailableMatch[1].replace(/,/g, "")
      )
    : null;

  const dd = ddAvailableMatch
    ? Number(
        ddAvailableMatch[1].replace(/,/g, "")
      )
    : null;

  /*
   * Detect quota completion independently.
   */
  const ssdCompleted =
    /Quota\s+Completed/i.test(ssdSection);

  const ddCompleted =
    /Quota\s+Completed/i.test(ddSection);

  /*
   * Extract SSD completion time.
   *
   * Example:
   * Quota Completed @ 2:10Am
   * Quota Completed @5:25
   */
  const ssdCompletedMatch =
    ssdSection.match(
      /Quota\s+Completed(?:\s*[@:-]|\s+at)?\s*([0-9]{1,2}(?:[:.][0-9]{2})?\s*(?:AM|PM)?)/i
    );

  /*
   * Extract DD completion time.
   *
   * Example:
   * Quota Completed @ 2:50Am
   * Quota Completed @5:28
   */
  const ddCompletedMatch =
    ddSection.match(
      /Quota\s+Completed(?:\s*[@:-]|\s+at)?\s*([0-9]{1,2}(?:[:.][0-9]{2})?\s*(?:AM|PM)?)/i
    );

  const ssdCompletedAtText =
    ssdCompletedMatch
      ? ssdCompletedMatch[1].trim()
      : null;

  const ddCompletedAtText =
    ddCompletedMatch
      ? ddCompletedMatch[1].trim()
      : null;

  /*
   * Determine SSD/DD status.
   */
  const ssdStatus = ssdCompleted
    ? "completed"
    : ssd !== null
    ? "active"
    : "unknown";

  const ddStatus = ddCompleted
    ? "completed"
    : dd !== null
    ? "active"
    : "unknown";

  /*
   * Extract advertised issuance start time.
   *
   * Examples:
   * 12:30Am
   * 12.30 AM
   * 1:30 AM
   * 5:30Pm
   */
  const issueStartMatch = text.match(
    /Issue\s+Started(?:\s*[@:-]|\s+at)?\s*([0-9]{1,2}(?:[:.][0-9]{2})?\s*(?:AM|PM)?)/i
  );

  const issueStartText =
    issueStartMatch
      ? issueStartMatch[1].trim()
      : null;

  /*
   * Extract advertised quotas if present.
   * Examples:
   * SSD 10K & DD 2K
   * SSD 15K
   */
  const ssdQuotaMatch = text.match(/SSD\s+(\d+)\s*(k|lac|lakh)?/i);
  let ssdQuota = null;
  if (ssdQuotaMatch) {
    const val = Number(ssdQuotaMatch[1]);
    const unit = ssdQuotaMatch[2]?.toLowerCase();
    ssdQuota = unit === "k" ? val * 1000 : unit === "lac" || unit === "lakh" ? val * 100000 : val;
  }

  const ddQuotaMatch = text.match(/DD\s+(\d+)\s*(k|lac|lakh)?/i);
  let ddQuota = null;
  if (ddQuotaMatch) {
    const val = Number(ddQuotaMatch[1]);
    const unit = ddQuotaMatch[2]?.toLowerCase();
    ddQuota = unit === "k" ? val * 1000 : unit === "lac" || unit === "lakh" ? val * 100000 : val;
  }

  /*
   * Extract advertised darshan date if present.
   * Examples:
   * 23rd October
   * 24 October
   */
  const dateMatch = text.match(
    /(\d{1,2})(?:st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December)/i
  );
  const darshanDateText = dateMatch ? dateMatch[0].trim() : null;

  /*
   * A message is meaningful if it contains:
   *
   * - SSD availability
   * - DD availability
   * - SSD completion
   * - DD completion
   * - issuance start time
   */
  if (
    ssd === null &&
    dd === null &&
    !ssdCompleted &&
    !ddCompleted &&
    !issueStartText
  ) {
    return null;
  }

  return {
    ssd_remaining: ssd,
    dd_remaining: dd,

    ssd_status: ssdStatus,
    dd_status: ddStatus,

    ssd_quota: ssdQuota,
    dd_quota: ddQuota,
    darshan_date_text: darshanDateText,

    issue_start_text: issueStartText,

    ssd_completed_at_text:
      ssdCompletedAtText,

    dd_completed_at_text:
      ddCompletedAtText,

    source_type: "telegram",

    raw_text: rawText.trim(),
  };
}

/**
 * Parses issuance start time text into an ISO string.
 * Disambiguates missing AM/PM using reference message time and indiaDate.
 */
export function parseIssueStartToIso(indiaDateOrOptions, maybeText, maybeRefDate) {
  let indiaDate, issueStartText, referenceDate;
  if (typeof indiaDateOrOptions === "object" && indiaDateOrOptions !== null) {
    ({ indiaDate, issueStartText, referenceDate } = indiaDateOrOptions);
  } else {
    indiaDate = indiaDateOrOptions;
    issueStartText = maybeText;
    referenceDate = maybeRefDate;
  }

  if (!issueStartText || typeof issueStartText !== "string") {
    return null;
  }

  const match = issueStartText
    .trim()
    .match(/^(\d{1,2})(?:[:.](\d{2}))?\s*(AM|PM)?$/i);

  if (!match) {
    return null;
  }

  const rawHour = Number(match[1]);
  const minute = Number(match[2] || 0);
  const meridiem = match[3]?.toUpperCase();

  if (rawHour < 0 || rawHour > 23 || minute < 0 || minute > 59) {
    return null;
  }

  const ref = referenceDate
    ? new Date(referenceDate)
    : indiaDate
    ? new Date(`${indiaDate}T12:00:00+05:30`)
    : new Date();
  const refMillis = ref.getTime();

  let candidateHours = [];
  if (rawHour >= 13) {
    candidateHours = [rawHour];
  } else if (meridiem === "PM") {
    candidateHours = [rawHour === 12 ? 12 : rawHour + 12];
  } else if (meridiem === "AM") {
    candidateHours = [rawHour === 12 ? 0 : rawHour];
  } else {
    candidateHours = [
      rawHour === 12 ? 0 : rawHour,
      rawHour === 12 ? 12 : rawHour + 12,
    ];
  }

  const candidateDates = new Set();
  if (indiaDate) candidateDates.add(indiaDate);

  const refIndiaDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(ref);
  if (refIndiaDate) candidateDates.add(refIndiaDate);

  let bestIso = null;
  let bestScore = Infinity;

  for (const dateStr of candidateDates) {
    const [year, month, day] = dateStr.split("-").map(Number);
    for (const h of candidateHours) {
      const utcMillis =
        Date.UTC(year, month - 1, day, h, minute, 0) -
        (5 * 60 + 30) * 60 * 1000;

      const diffFromRef = refMillis - utcMillis;
      // Issuance start shouldn't be far in the future compared to reference message
      if (diffFromRef < -30 * 60 * 1000) {
        continue;
      }

      const score = Math.abs(diffFromRef);
      if (score < bestScore) {
        bestScore = score;
        bestIso = new Date(utcMillis).toISOString();
      }
    }
  }

  if (!bestIso) {
    const [year, month, day] = (indiaDate || refIndiaDate).split("-").map(Number);
    const h = candidateHours[0];
    const utcMillis =
      Date.UTC(year, month - 1, day, h, minute, 0) -
      (5 * 60 + 30) * 60 * 1000;
    bestIso = new Date(utcMillis).toISOString();
  }

  return bestIso;
}

/**
 * Parses completion time text into an ISO string.
 * Disambiguates missing AM/PM, prevents earlier-than-start errors, and handles
 * midnight rollovers (where tokens issued in the evening complete past midnight).
 */
export function parseEventTimeToIso(
  indiaDateOrOptions,
  maybeText,
  maybeRefDate,
  maybeIssuanceStartedAt
) {
  let indiaDate, timeText, referenceDate, issuanceStartedAt;
  if (typeof indiaDateOrOptions === "object" && indiaDateOrOptions !== null) {
    ({ indiaDate, timeText, referenceDate, issuanceStartedAt } =
      indiaDateOrOptions);
  } else {
    indiaDate = indiaDateOrOptions;
    timeText = maybeText;
    referenceDate = maybeRefDate;
    issuanceStartedAt = maybeIssuanceStartedAt;
  }

  if (!timeText || typeof timeText !== "string") {
    return null;
  }

  const match = timeText
    .trim()
    .match(/^(\d{1,2})(?:[:.](\d{2}))?\s*(AM|PM)?$/i);

  if (!match) {
    return null;
  }

  const rawHour = Number(match[1]);
  const minute = Number(match[2] || 0);
  const meridiem = match[3]?.toUpperCase();

  if (rawHour < 0 || rawHour > 23 || minute < 0 || minute > 59) {
    return null;
  }

  const ref = referenceDate
    ? new Date(referenceDate)
    : indiaDate
    ? new Date(`${indiaDate}T12:00:00+05:30`)
    : new Date();
  const refMillis = ref.getTime();

  let candidateHours = [];
  if (rawHour >= 13) {
    candidateHours = [rawHour];
  } else if (meridiem === "PM") {
    candidateHours = [rawHour === 12 ? 12 : rawHour + 12];
  } else if (meridiem === "AM") {
    candidateHours = [rawHour === 12 ? 0 : rawHour];
  } else {
    candidateHours = [
      rawHour === 12 ? 0 : rawHour,
      rawHour === 12 ? 12 : rawHour + 12,
    ];
  }

  const candidateDates = new Set();
  const refIndiaDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(ref);

  if (refIndiaDate) candidateDates.add(refIndiaDate);
  if (indiaDate) candidateDates.add(indiaDate);

  const prevDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(refMillis - 24 * 3600 * 1000));

  const nextDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(refMillis + 24 * 3600 * 1000));

  candidateDates.add(prevDate);
  candidateDates.add(nextDate);

  const startMillis = issuanceStartedAt
    ? new Date(issuanceStartedAt).getTime()
    : null;

  let bestIso = null;
  let bestScore = Infinity;

  for (const dateStr of candidateDates) {
    const [year, month, day] = dateStr.split("-").map(Number);
    for (const h of candidateHours) {
      const utcMillis =
        Date.UTC(year, month - 1, day, h, minute, 0) -
        (5 * 60 + 30) * 60 * 1000;

      const diffFromRef = refMillis - utcMillis;

      // Allow up to 30 mins clock skew if message reported slightly before clock or roundoff
      if (diffFromRef < -30 * 60 * 1000) {
        continue;
      }

      let penalty = 0;
      // If event happened before issuance start (allow 10 mins clock skew), penalize heavily
      if (startMillis && utcMillis < startMillis - 10 * 60 * 1000) {
        penalty += 1e9;
      }

      const score = Math.abs(diffFromRef) + penalty;
      if (score < bestScore) {
        bestScore = score;
        bestIso = new Date(utcMillis).toISOString();
      }
    }
  }

  if (!bestIso) {
    const [year, month, day] = (indiaDate || refIndiaDate).split("-").map(Number);
    const h = candidateHours[0];
    const utcMillis =
      Date.UTC(year, month - 1, day, h, minute, 0) -
      (5 * 60 + 30) * 60 * 1000;
    bestIso = new Date(utcMillis).toISOString();
  }

  return bestIso;
}
