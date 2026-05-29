import { Checkbox, Radio, Stack } from "@mantine/core";
import type { SelectionAnswer } from "../../types";

interface SelectionProps {
  answer: SelectionAnswer;
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  disabled?: boolean;
}

export function Selection({
  answer,
  value,
  onChange,
  disabled,
}: SelectionProps) {
  // 複数選択 (CAQ など "check all that apply")
  if (answer.multiple) {
    const selected = Array.isArray(value) ? value : [];
    return (
      <Checkbox.Group value={selected} onChange={onChange}>
        <Stack gap="sm">
          {answer.items.map((label, idx) => (
            <Checkbox
              variant="outline"
              key={idx}
              value={label}
              label={label}
              disabled={disabled}
            />
          ))}
        </Stack>
      </Checkbox.Group>
    );
  }

  return (
    <Radio.Group
      value={typeof value === "string" ? value : undefined}
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
