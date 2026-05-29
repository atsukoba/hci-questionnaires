import type { Questionnaire } from "../types";

// Fisher-Yates シャッフル (元配列は変更しない)
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// randomize: true のセクションの項目順をシャッフルした新しい質問紙を返す。
// セッション開始時に一度だけ適用することで、再描画でも順序が固定される。
export function applyRandomization(questionnaire: Questionnaire): Questionnaire {
  return {
    ...questionnaire,
    pages: questionnaire.pages.map((page) => ({
      ...page,
      sections: page.sections.map((section) =>
        section.randomize
          ? { ...section, items: shuffle(section.items) }
          : section
      ),
    })),
  };
}

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
