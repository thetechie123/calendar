export function getLatestObservation(observations = []) {
  return observations.length > 0
    ? observations[observations.length - 1]
    : null;
}

export function formatTokenTime(dateValue) {
  if (!dateValue) {
    return "—";
  }

  return new Date(dateValue).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatTokenDate(dateValue) {
  if (!dateValue) {
    return "—";
  }

  return new Date(`${dateValue}T00:00:00`).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export function formatTokenDateTime(dateValue) {
  if (!dateValue) {
    return "—";
  }

  return new Date(dateValue).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function buildTokenActivityEvents({
  tokenDay,
  observations = [],
  lang = "en",
}) {
  const activityEvents = [];
  const usedObsIds = new Set();

  const toTime = (d) => (d ? new Date(d).getTime() : null);

  // Find observation within 2 minutes of target time to merge duplicate events
  const findNearObservation = (targetTime) => {
    if (!targetTime) return null;
    const t = toTime(targetTime);
    let best = null;
    let minDiff = 120000; // 2 minutes
    observations.forEach((obs) => {
      if (!obs.observed_at) return;
      const diff = Math.abs(toTime(obs.observed_at) - t);
      if (diff <= minDiff) {
        minDiff = diff;
        best = obs;
      }
    });
    return best;
  };

  // Find latest observation on or before a given timestamp
  const findLatestObservationBefore = (targetTime) => {
    if (!targetTime || !observations.length) return null;
    const t = toTime(targetTime);
    let best = null;
    observations.forEach((obs) => {
      if (!obs.observed_at) return;
      const obsT = toTime(obs.observed_at);
      if (obsT <= t + 60000) {
        if (!best || obsT > toTime(best.observed_at)) {
          best = obs;
        }
      }
    });
    return best;
  };

  if (tokenDay?.issuance_started_at) {
    activityEvents.push({
      id: "issuance-start",
      type: "start",
      time: tokenDay.issuance_started_at,
      title:
        lang === "te"
          ? "టోకెన్ల జారీ ప్రారంభమైంది"
          : "Token Issuance Started",
      label:
        lang === "te"
          ? "జారీ ప్రారంభం"
          : "Issuance Start",
    });
  }

  if (tokenDay?.ssd_completed_at) {
    const nearObs = findNearObservation(tokenDay.ssd_completed_at);
    if (nearObs) usedObsIds.add(nearObs.id);
    const fallbackObs = nearObs || findLatestObservationBefore(tokenDay.ssd_completed_at);

    activityEvents.push({
      id: "ssd-completed",
      type: "ssd-completed",
      time: tokenDay.ssd_completed_at,
      title:
        lang === "te"
          ? "SSD టోకెన్ల కోటా పూర్తయింది"
          : "SSD Token Quota Completed",
      label:
        lang === "te"
          ? "SSD పూర్తయింది"
          : "SSD Completed",
      observation: fallbackObs,
    });
  }

  if (tokenDay?.dd_completed_at) {
    const nearObs = findNearObservation(tokenDay.dd_completed_at);
    if (nearObs) usedObsIds.add(nearObs.id);
    const fallbackObs = nearObs || findLatestObservationBefore(tokenDay.dd_completed_at);

    activityEvents.push({
      id: "dd-completed",
      type: "dd-completed",
      time: tokenDay.dd_completed_at,
      title:
        lang === "te"
          ? "DD టోకెన్ల కోటా పూర్తయింది"
          : "DD Token Quota Completed",
      label:
        lang === "te"
          ? "DD పూర్తయింది"
          : "DD Completed",
      observation: fallbackObs,
    });
  }

  const ssdCompTime = toTime(tokenDay?.ssd_completed_at);
  const ddCompTime = toTime(tokenDay?.dd_completed_at);

  observations.forEach((observation) => {
    if (usedObsIds.has(observation.id)) return;

    const obsTime = toTime(observation.observed_at);

    // Omit empty observations recorded after both quotas were completed
    if (
      ssdCompTime &&
      ddCompTime &&
      obsTime &&
      obsTime >= Math.max(ssdCompTime, ddCompTime) &&
      (observation.ssd_remaining == null || observation.ssd_remaining === "") &&
      (observation.dd_remaining == null || observation.dd_remaining === "")
    ) {
      return;
    }

    activityEvents.push({
      id: `observation-${observation.id}`,
      type: "observation",
      time: observation.observed_at,
      title:
        lang === "te"
          ? "టోకెన్ పరిశీలన"
          : "Token Observation",
      label: lang === "te" ? "పరిశీలన" : "Observation",
      observation,
    });
  });

  return activityEvents.sort(
    (a, b) =>
      new Date(a.time).getTime() - new Date(b.time).getTime()
  );
}

export function getActivityTokenValues({
  event,
  tokenDay,
}) {
  const observation = event?.observation;
  const toTime = (d) => (d ? new Date(d).getTime() : null);
  const eventTime = toTime(event?.time);
  const ssdCompTime = toTime(tokenDay?.ssd_completed_at);
  const ddCompTime = toTime(tokenDay?.dd_completed_at);

  function formatVal(val) {
    if (val === null || val === undefined || val === "" || val === "—") return null;
    const n = Number(String(val).replace(/,/g, ""));
    return Number.isFinite(n) ? n.toLocaleString("en-IN") : String(val);
  }

  let ssdValue = "—";
  let ddValue = "—";

  if (event?.type === "start") {
    ssdValue = formatVal(tokenDay?.ssd_quota) ?? "—";
    ddValue = formatVal(tokenDay?.dd_quota) ?? "—";
  } else if (event?.type === "ssd-completed") {
    ssdValue = "Completed";
    if (ddCompTime && eventTime && ddCompTime <= eventTime) {
      ddValue = "Completed";
    } else if (
      observation?.dd_remaining !== undefined &&
      observation?.dd_remaining !== null &&
      observation?.dd_remaining !== ""
    ) {
      ddValue = formatVal(observation.dd_remaining) ?? "—";
    } else {
      ddValue = "—";
    }
  } else if (event?.type === "dd-completed") {
    ddValue = "Completed";
    if (ssdCompTime && eventTime && ssdCompTime <= eventTime) {
      ssdValue = "Completed";
    } else if (
      observation?.ssd_remaining !== undefined &&
      observation?.ssd_remaining !== null &&
      observation?.ssd_remaining !== ""
    ) {
      ssdValue = formatVal(observation.ssd_remaining) ?? "—";
    } else {
      ssdValue = "—";
    }
  } else if (event?.type === "observation") {
    if (
      observation?.ssd_status === "completed" ||
      (ssdCompTime && eventTime && eventTime >= ssdCompTime)
    ) {
      ssdValue = "Completed";
    } else {
      ssdValue = formatVal(observation?.ssd_remaining) ?? "—";
    }

    if (
      observation?.dd_status === "completed" ||
      (ddCompTime && eventTime && eventTime >= ddCompTime)
    ) {
      ddValue = "Completed";
    } else {
      ddValue = formatVal(observation?.dd_remaining) ?? "—";
    }
  }

  return { ssdValue, ddValue };
}

export function getHistoryDayDetails(day) {
  const observations = day.observations || [];
  const lastObservation = getLatestObservation(observations);
  const ssdCompleted = day.ssd_status === "completed";
  const ddCompleted = day.dd_status === "completed";
  const dayCompleted = ssdCompleted && ddCompleted;

  return {
    observations,
    lastObservation,
    historyStatus: dayCompleted
      ? "COMPLETED"
      : observations.length > 0
      ? "RECORDED"
      : "NO DATA",
  };
}
