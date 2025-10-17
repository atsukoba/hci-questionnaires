import { Textarea } from "@mantine/core";
import type { TextAnswer } from "../../types";

interface InputTextProps {
  answer: TextAnswer;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function InputText({
  answer,
  value,
  onChange,
  disabled,
}: InputTextProps) {
  return (
    <Textarea
      label={answer.label}
      placeholder="Type your answer"
      autosize
      minRows={3}
      value={value ?? ""}
      onChange={(e) => onChange(e.currentTarget.value)}
      disabled={disabled}
    />
  );
}
