import api from "./api";

export async function sendReportPhase1(sessionId, report) {
  await api.post("/reports/phase1/", {
    sessionId,
    report,
  });
}

export async function sendReportPhase2Block(sessionId, report) {
  await api.post("/reports/phase2/", {
    sessionId,
    report,
  });
}
