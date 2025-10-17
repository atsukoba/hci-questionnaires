import { Alert, Paper, Stack, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import type { Item } from "../types";
import { LikertScale } from "./answer/likert";
import { Selection } from "./answer/selection";
import { SelectionCard } from "./answer/selection-card";
import { InputText } from "./answer/input-text";
import {
  NumberInput,
  Slider,
  Stack as MStack,
  Group as MGroup,
  Text as MText,
} from "@mantine/core";
import type { NumericalAnswer, VASAnswer } from "../types";

interface QuestionItemProps {
  item: Item;
  value?: any;
  onChange: (value: any) => void;
  error?: string;
}

export function QuestionItem({
  item,
  value,
  onChange,
  error,
}: QuestionItemProps) {
  const renderQuestion = () => {
    switch (item.question.type) {
      case "agreement":
        return (
          <Text size="lg" fw={500}>
            {"text" in item.question
              ? item.question.text
              : (item as any).question.value}
          </Text>
        );
      case "bipolar":
        return (
          <Stack gap="xs">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text size="md" c="blue">
                {item.question.left}
              </Text>
              <Text size="md" c="blue">
                {item.question.right}
              </Text>
            </div>
          </Stack>
        );
      case "question":
        return (
          <Text size="lg" fw={500}>
            {"text" in item.question
              ? item.question.text
              : (item as any).question.value}
          </Text>
        );
      default:
        return null;
    }
  };

  const renderAnswer = () => {
    switch (item.answer.type) {
      case "likert":
        return (
          <LikertScale answer={item.answer} value={value} onChange={onChange} />
        );
      case "selection":
        return (
          <Selection answer={item.answer} value={value} onChange={onChange} />
        );
      case "selection_card":
        return (
          <SelectionCard
            answer={item.answer}
            value={value}
            onChange={onChange}
          />
        );
      case "input_text":
        return (
          <InputText answer={item.answer} value={value} onChange={onChange} />
        );
      case "input_numerical": {
        const a = item.answer as NumericalAnswer;
        const num = typeof value === "number" ? value : undefined;
        return (
          <NumberInput
            min={a.min}
            max={a.max}
            value={num}
            onChange={(v) => typeof v === "number" && onChange(v)}
          />
        );
      }
      case "vas": {
        const a = item.answer as VASAnswer;
        const num = typeof value === "number" ? value : a.min;
        return (
          <MStack gap="xs">
            <MGroup justify="space-between">
              <MText size="sm" c="dimmed">
                {a.leftLabel ?? "Low"}
              </MText>
              <MText size="sm" c="dimmed">
                {a.rightLabel ?? "High"}
              </MText>
            </MGroup>
            <Slider
              min={a.min}
              max={a.max}
              step={a.step}
              value={num}
              onChange={(v) => onChange(v)}
              marks={[{ value: a.min }, { value: a.max }]}
            />
            {a.showValue && (
              <MText size="sm" ta="center" c="blue">
                {num}
              </MText>
            )}
          </MStack>
        );
      }
      default:
        return (
          <Alert
            color="yellow"
            title="Not implemented"
            icon={<IconAlertCircle size="1rem" />}
          >
            This answer type will be implemented soon.
          </Alert>
        );
    }
  };

  return (
    <Paper shadow="sm" p="xl" radius="md" withBorder>
      <Stack gap="lg">
        {renderQuestion()}
        {renderAnswer()}

        {error && (
          <Alert
            color="red"
            title="Input error"
            icon={<IconAlertCircle size="1rem" />}
          >
            {error}
          </Alert>
        )}
      </Stack>
    </Paper>
  );
}
