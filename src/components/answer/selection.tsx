import { Radio, Stack } from "@mantine/core";
import type { SelectionAnswer } from "../../types";

interface SelectionProps {
  answer: SelectionAnswer;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function Selection({
  answer,
  value,
  onChange,
  disabled,
}: SelectionProps) {
  return (
    <Radio.Group
      value={value}
      onChange={onChange}
      withAsterisk={answer.required}
    >
      <Stack gap="sm">
        {answer.items.map((label, idx) => (
          <Radio
            variant="outline"
            key={idx}
            value={label}
            label={label}
            disabled={disabled}
          />
        ))}
      </Stack>
    </Radio.Group>
  );
}
