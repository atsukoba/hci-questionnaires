import {
  Badge,
  Button,
  Card,
  Checkbox,
  Container,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { loadAllQuestionnaires } from "../utils/questionnaire-loader";

export function BuilderPage() {
  const [available, setAvailable] = useState<
    { id: string; name: string; description: string }[]
  >([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [participantId, setParticipantId] = useState("");
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    (async () => {
      const data = await loadAllQuestionnaires();
      setAvailable(
        data.map((q) => ({
          id: q.id,
          name: q.name,
          description: q.description,
        }))
      );
      setBaseUrl(`${window.location.origin}`);
    })();
  }, []);

  const flowParam = useMemo(() => selected.join(","), [selected]);
  const startUrl = useMemo(() => {
    if (!flowParam) return "";
    const params = new URLSearchParams();
    if (participantId) params.set("id", participantId);
    params.set("flow", flowParam);
    params.set("step", "1");
    return `${baseUrl}/?${params.toString()}`;
  }, [baseUrl, flowParam, participantId]);

  return (
    <Container size="md">
      <Title order={2} mb="md">
        Flow Builder
      </Title>
      <Text c="dimmed" mb="lg">
        Select questionnaires and a participant ID to generate a shareable URL.
      </Text>

      <Stack gap="lg">
        <Card withBorder p="lg" radius="md">
          <Title order={4} mb="sm">
            1. Select questionnaires (order = check sequence)
          </Title>
          <Stack gap="xs">
            {available.map((q) => (
              <Checkbox
                key={q.id}
                label={
                  <div>
                    <Text fw={500}>{q.name}</Text>
                    <Text size="xs" c="dimmed">
                      {q.description}
                    </Text>
                  </div>
                }
                checked={selected.includes(q.id)}
                onChange={(e) => {
                  const checked = e.currentTarget.checked;
                  setSelected((prev) => {
                    if (checked) return [...prev, q.id];
                    return prev.filter((id) => id !== q.id);
                  });
                }}
              />
            ))}
          </Stack>
        </Card>

        <Card withBorder p="lg" radius="md">
          <Title order={4} mb="sm">
            2. Participant ID
          </Title>
          <TextInput
            placeholder="participant-id"
            value={participantId}
            onChange={(e) => setParticipantId(e.currentTarget.value)}
          />
        </Card>

        <Card withBorder p="lg" radius="md">
          <Title order={4} mb="sm">
            3. Shareable URL
          </Title>
          {startUrl ? (
            <Stack gap="sm">
              <Text size="sm" c="dimmed">
                Use the link below to start the flow.
              </Text>
              <Badge
                variant="light"
                size="lg"
                styles={{ root: { whiteSpace: "normal" } }}
              >
                {startUrl}
              </Badge>
              <Group>
                <Button
                  component="a"
                  href={startUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Start
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(startUrl)}
                >
                  Copy
                </Button>
              </Group>
            </Stack>
          ) : (
            <Text c="dimmed">
              Select at least one questionnaire to show the URL
            </Text>
          )}
        </Card>
      </Stack>
    </Container>
  );
}
