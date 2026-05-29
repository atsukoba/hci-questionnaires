import { stringify } from "csv-stringify/browser/esm/sync";
import type { ResponseData } from "../types";

export interface CSVRow {
  participantId: string;
  questionnaireId: string;
  itemId: string;
  value: string;
  responseTime: number;
  timestamp: string;
  startTime: string;
  endTime: string;
  userAgent: string;
  screenResolution: string;
}

// localStorage から復元すると Date は ISO 文字列になるため、両方を許容する
function toISO(value: Date | string | undefined | null): string {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString();
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? String(value) : parsed.toISOString();
}

export function convertToCSV(responseDataList: ResponseData[]): string {
  const rows: CSVRow[] = [];

  for (const responseData of responseDataList) {
    for (const response of responseData.responses) {
      rows.push({
        participantId: responseData.participantId || "anonymous",
        questionnaireId: responseData.questionnaireId,
        itemId: response.itemId,
        value: Array.isArray(response.value)
          ? response.value.join(";")
          : String(response.value),
        responseTime: response.responseTime,
        timestamp: toISO(response.timestamp),
        startTime: toISO(responseData.startTime),
        endTime: toISO(responseData.endTime),
        userAgent: responseData.metadata.userAgent,
        screenResolution: responseData.metadata.screenResolution,
      });
    }
  }

  return stringify(rows, {
    header: true,
    columns: [
      "participantId",
      "questionnaireId",
      "itemId",
      "value",
      "responseTime",
      "timestamp",
      "startTime",
      "endTime",
      "userAgent",
      "screenResolution",
    ],
  });
}

export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function exportAllResponses(responseDataList: ResponseData[]): void {
  const csvContent = convertToCSV(responseDataList);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `questionnaire-responses-${timestamp}.csv`;
  downloadCSV(csvContent, filename);
}

export function exportQuestionnaireResponses(
  responseDataList: ResponseData[],
  questionnaireId: string
): void {
  const filteredData = responseDataList.filter(
    (data) => data.questionnaireId === questionnaireId
  );
  const csvContent = convertToCSV(filteredData);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `${questionnaireId}-responses-${timestamp}.csv`;
  downloadCSV(csvContent, filename);
}
