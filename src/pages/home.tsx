import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { loadAllQuestionnaires } from "../utils/questionnaire-loader";
import { countAllItems } from "../utils/questionnaire-utils";

const questionnaires = await loadAllQuestionnaires();

export function HomePage() {
  const navigate = useNavigate();

  // If URL includes flow & step, jump to the corresponding questionnaire route, preserving the query string
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const flowParam = params.get("flow");
    const stepParam = params.get("step");
    if (!flowParam || !stepParam) return;

    const flow = flowParam
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const stepIndex = Math.max(0, Number(stepParam) - 1);
    const targetId = flow[stepIndex];
    if (!targetId) return;

    const qs = window.location.search || "";
    navigate({ to: `/${targetId}` });
    window.history.replaceState(null, "", `/${targetId}${qs}`);
  }, [navigate]);

  return (
    <Container size="lg">
      <div style={{ marginBottom: "2rem" }}>
        <Title order={1} mb="md">
          Questionnaire System
        </Title>
        <Text size="lg" c="dimmed">
          This is a research questionnaire system. Select a questionnaire below
          to begin.
        </Text>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {questionnaires.map((questionnaire) => (
          <Card
            key={questionnaire.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Group justify="space-between" mb="xs">
              <Badge color="gray" variant="outline">
                {questionnaire.pages.length} pages
              </Badge>
              <Badge color="gray" variant="outline">
                {countAllItems(questionnaire)} items
              </Badge>
            </Group>

            <Title order={4} mb="sm">
              {questionnaire.name}
            </Title>

            <Text size="sm" c="dimmed" mb="md" style={{ minHeight: "3rem" }}>
              {questionnaire.description}
            </Text>

            <Group justify="space-between" mt="auto">
              <Button
                component={Link}
                to={`/${questionnaire.id}`}
                variant="light"
                size="sm"
              >
                Start
              </Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
