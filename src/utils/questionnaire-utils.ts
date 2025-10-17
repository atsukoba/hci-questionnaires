import type { Questionnaire } from "../types";

export function countAllItems(questionnaire: Questionnaire): number {
  return questionnaire.pages.reduce(
    (total, page) =>
      total +
      page.sections.reduce((total, section) => total + section.items.length, 0),
    0
  );
}

export function countAllSections(questionnaire: Questionnaire): number {
  return questionnaire.pages.reduce(
    (total, page) => total + page.sections.length,
    0
  );
}
