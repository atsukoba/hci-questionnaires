import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { ResponseData, Response } from "../types";

// 現在の回答セッション
export const currentResponsesAtom = atom<Record<string, any>>({});

// 現在の質問紙ID
export const currentQuestionnaireIdAtom = atom<string | null>(null);

// 現在のページ
export const currentPageAtom = atom<number>(0);

// セッション開始時間
export const sessionStartTimeAtom = atom<Date | null>(null);

// 完了したレスポンスデータ (LocalStorageに保存)
export const completedResponsesAtom = atomWithStorage<ResponseData[]>(
  "questionnaire-responses",
  []
);

// 現在のレスポンスを保存する関数
export const saveCurrentResponseAtom = atom(
  null,
  (get, set, questionnaireId: string) => {
    const responses = get(currentResponsesAtom);
    const startTime = get(sessionStartTimeAtom);
    const completedResponses = get(completedResponsesAtom);

    if (!startTime) return;

    // レスポンスデータを構築
    const responseData: ResponseData = {
      questionnaireId,
      responses: Object.entries(responses).map(
        ([itemId, value]): Response => ({
          itemId,
          value,
          responseTime: 0, // TODO: 実際の回答時間を測定
          timestamp: new Date(),
        })
      ),
      startTime,
      endTime: new Date(),
      metadata: {
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
      },
    };

    // 完了データに追加
    set(completedResponsesAtom, [...completedResponses, responseData]);

    // 現在のセッションをリセット
    set(currentResponsesAtom, {});
    set(currentPageAtom, 0);
    set(sessionStartTimeAtom, null);
  }
);

// セッションを開始する関数
export const startSessionAtom = atom(
  null,
  (_get, set, questionnaireId: string) => {
    set(currentQuestionnaireIdAtom, questionnaireId);
    set(sessionStartTimeAtom, new Date());
    set(currentResponsesAtom, {});
    set(currentPageAtom, 0);
  }
);

// レスポンスを更新する関数
export const updateResponseAtom = atom(
  null,
  (get, set, itemId: string, value: any) => {
    const currentResponses = get(currentResponsesAtom);
    set(currentResponsesAtom, {
      ...currentResponses,
      [itemId]: value,
    });
  }
);
