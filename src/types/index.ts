// 質問紙の型定義
export interface Questionnaire {
  id: string;
  name: string;
  description: string;
  pages: Page[];
}

export interface Page {
  sections: Section[];
}

export interface Section {
  title: string;
  description?: string;
  randomize?: boolean;
  items: Item[];
}

export interface Item {
  id: string;
  question: Question;
  answer: Answer;
}

// 質問タイプ
export type Question = AgreementQuestion | BipolarQuestion | PlainQuestion;

export interface AgreementQuestion {
  type: "agreement";
  value: string;
}

export interface BipolarQuestion {
  type: "bipolar";
  left: string;
  right: string;
}

export interface PlainQuestion {
  type: "question";
  value: string;
}

// 回答タイプ
export type Answer =
  | LikertAnswer
  | VASAnswer
  | NumericalAnswer
  | SelectionAnswer
  | SelectionCardAnswer
  | TextAnswer;

export interface LikertAnswer {
  type: "likert";
  min: number;
  max: number;
  labels: string[];
  required: boolean;
}

export interface VASAnswer {
  type: "vas";
  min: number;
  max: number;
  step: number;
  showValue: boolean;
  required: boolean;
  leftLabel?: string;
  rightLabel?: string;
}

export interface NumericalAnswer {
  type: "input_numerical";
  min: number;
  max: number;
  required: boolean;
}

export interface SelectionAnswer {
  type: "selection";
  items: string[];
  required: boolean;
}

export interface SelectionCardAnswer {
  type: "selection_card";
  items: {
    title: string;
    description: string;
  }[];
  required: boolean;
}

export interface TextAnswer {
  type: "input_text";
  label: string;
  required: boolean;
}

// 回答データの型定義
export interface ResponseData {
  participantId?: string;
  questionnaireId: string;
  responses: Response[];
  startTime: Date;
  endTime?: Date;
  metadata: {
    userAgent: string;
    screenResolution: string;
  };
}

export interface Response {
  itemId: string;
  value: string | number | string[];
  responseTime: number; // ms
  timestamp: Date;
}
