import { Card, Grid, Text } from "@mantine/core";
import type { SelectionCardAnswer } from "../../types";

interface SelectionCardProps {
  answer: SelectionCardAnswer;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SelectionCard({
  answer,
  value,
  onChange,
  disabled,
}: SelectionCardProps) {
  return (
    <Grid gutter="md">
      {answer.items.map((item, idx) => {
        const selected = value === item.title;
        return (
          <Grid.Col key={idx} span={{ base: 12, sm: 6 }}>
            <Card
              withBorder
              shadow={selected ? "md" : "sm"}
              padding="lg"
              radius="md"
              style={{
                cursor: disabled ? "not-allowed" : "pointer",
                borderColor: selected
                  ? "var(--mantine-color-blue-6)"
                  : undefined,
                background: selected
                  ? "var(--mantine-color-blue-0)"
                  : undefined,
              }}
              onClick={() => !disabled && onChange(item.title)}
            >
              <Text fw={600}>{item.title}</Text>
              <Text size="sm" c="dimmed">
                {item.description}
              </Text>
            </Card>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
