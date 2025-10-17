import { NumberInput } from "@mantine/core";
import type { NumericalAnswer } from "../../types";

interface InputNumericalProps {
  answer: NumericalAnswer;
  value?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function InputNumerical({
  answer,
  value,
  onChange,
  disabled,
}: InputNumericalProps) {
  return (
    <NumberInput
      variant="filled"
      size="md"
      label="Input label"
      description="Input description"
      placeholder="Input placeholder"
      value={value}
      onChange={(v) => onChange(Number(v))}
      disabled={disabled}
      min={answer.min}
      max={answer.max}
      withAsterisk={answer.required}
    />
  );
}
