import { Button, Group, Stack, Text } from "@mantine/core";
import { useState } from "react";
import type { LikertAnswer } from "../../types";

interface LikertScaleProps {
  answer: LikertAnswer;
  value?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function LikertScale({
  answer,
  value,
  onChange,
  disabled,
}: LikertScaleProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const scaleValues = Array.from(
    { length: answer.max - answer.min + 1 },
    (_, i) => answer.min + i
  );

  const hasAnchors = Boolean(answer.minLabel || answer.maxLabel);

  return (
    <Stack gap="sm">
      <Group justify="center" gap="md" align="center" wrap="nowrap">
        {hasAnchors && (
          <Text
            size="sm"
            c="dimmed"
            ta="right"
            style={{ flex: 1, minWidth: 0 }}
          >
            {answer.minLabel ?? ""}
          </Text>
        )}
        {scaleValues.map((scaleValue) => {
          const isSelected = value === scaleValue;
          const isHovered = hoveredValue === scaleValue;
          return (
            <Button
              key={scaleValue}
              variant={isSelected ? "filled" : "outline"}
              size="sm"
              w={45}
              h={45}
              p={0}
              disabled={disabled}
              onClick={() => onChange(scaleValue)}
              onMouseEnter={() => setHoveredValue(scaleValue)}
              onMouseLeave={() => setHoveredValue(null)}
              style={{
                borderRadius: "50%",
                fontWeight: 600,
                backgroundColor: isSelected
                  ? "var(--mantine-primary-color-filled)"
                  : isHovered
                  ? "var(--mantine-primary-color-light)"
                  : undefined,
              }}
            >
              {scaleValue}
            </Button>
          );
        })}
        {hasAnchors && (
          <Text size="sm" c="dimmed" ta="left" style={{ flex: 1, minWidth: 0 }}>
            {answer.maxLabel ?? ""}
          </Text>
        )}
      </Group>
    </Stack>
  );
}
