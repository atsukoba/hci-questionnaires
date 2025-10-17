import {
  Alert,
  Badge,
  Button,
  Container,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
} from "@tabler/icons-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  completedResponsesAtom,
  currentPageAtom,
  currentResponsesAtom,
  saveCurrentResponseAtom,
  startSessionAtom,
  updateResponseAtom,
} from "../atoms";
import { QuestionItem } from "../components/question-item";
import type { Questionnaire } from "../types";
import {
  exportAllResponses,
  exportQuestionnaireResponses,
} from "../utils/csv-export";
import { loadQuestionnaire } from "../utils/questionnaire-loader";

export function QuestionnairePage() {
  const { questionnaireId } = useParams({ from: "/$questionnaireId" });
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCompletion, setShowCompletion] = useState(false);

  // Jotai atoms
  const [responses] = useAtom(currentResponsesAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [completedResponses] = useAtom(completedResponsesAtom);
  const startSession = useSetAtom(startSessionAtom);
  const saveCurrentResponse = useSetAtom(saveCurrentResponseAtom);
  const updateResponse = useSetAtom(updateResponseAtom);

  useEffect(() => {
    async function loadData() {
      if (!questionnaireId) return;

      setLoading(true);
      // Resolve flow & step from URL if present
      let targetId = questionnaireId;
      let flowIds: string[] | null = null;
      let stepIndex = 0;
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const flowParam = params.get("flow");
        const stepParam = params.get("step");
        if (flowParam && stepParam) {
          flowIds = flowParam
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
          stepIndex = Math.max(0, Number(stepParam) - 1);
          targetId = flowIds[stepIndex] ?? questionnaireId;
        }
      }

      // Align path with targetId if mismatched, preserve query string
      if (targetId !== questionnaireId && typeof window !== "undefined") {
        const qs = window.location.search || "";
        navigate({ to: `/${targetId}` });
        window.history.replaceState(null, "", `/${targetId}${qs}`);
      }

      const data = await loadQuestionnaire(targetId);
      setQuestionnaire(data);
      setLoading(false);

      // Start session
      if (data) {
        startSession(data.id);
      }
    }

    loadData();
  }, [questionnaireId, startSession]);

  const handleResponse = (itemId: string, value: any) => {
    updateResponse(itemId, value);

    // Clear error for this item when updated
    if (errors[itemId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[itemId];
        return newErrors;
      });
    }
  };

  const validateCurrentPage = () => {
    if (!questionnaire) return true;

    const page = questionnaire.pages[currentPage];
    const newErrors: Record<string, string> = {};

    for (const section of page.sections) {
      for (const item of section.items) {
        if (item.answer.required && !responses[item.id]) {
          newErrors[item.id] = "This item is required";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentPage()) return;

    if (questionnaire && currentPage >= questionnaire.pages.length - 1) {
      handleComplete();
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleComplete = () => {
    if (!questionnaireId) return;

    saveCurrentResponse(questionnaireId);

    // If flow is active, advance to next step while preserving query string
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const flowParam = params.get("flow");
      const stepParam = params.get("step");
      if (flowParam && stepParam) {
        const flow = flowParam
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        const currentStep = Math.max(1, Number(stepParam));
        const nextStep = currentStep + 1;
        if (nextStep <= flow.length) {
          const nextId = flow[nextStep - 1];
          params.set("step", String(nextStep));
          const qs = `?${params.toString()}`;
          navigate({ to: `/${nextId}` });
          window.history.replaceState(null, "", `/${nextId}${qs}`);
          return; // don't show completion yet; continue flow
        }
      }
    }

    // Flow finished or not in flow: show completion and then return home
    setShowCompletion(true);
    setTimeout(() => {
      navigate({ to: "/" });
    }, 3000);
  };

  const handleExportCSV = () => {
    if (!questionnaireId) return;
    exportQuestionnaireResponses(completedResponses, questionnaireId);
  };

  const handleExportAllCSV = () => {
    exportAllResponses(completedResponses);
  };

  if (loading) {
    return (
      <Container size="md">
        <Paper shadow="sm" p="xl" radius="md">
          <Text>Loading...</Text>
        </Paper>
      </Container>
    );
  }

  if (!questionnaire) {
    return (
      <Container size="md">
        <Paper shadow="sm" p="xl" radius="md">
          <Alert color="red" title="Error">
            Questionnaire "{questionnaireId}" was not found.
          </Alert>
        </Paper>
      </Container>
    );
  }

  if (showCompletion) {
    return (
      <Container size="md">
        <Paper shadow="sm" p="xl" radius="md" ta="center">
          <IconCheck
            size={48}
            color="green"
            style={{ margin: "0 auto 1rem" }}
          />
          <Title order={2} mb="md">
            Completed
          </Title>
          <Text mb="lg">
            You have completed: {questionnaire.name}.
            <br />
            Thank you for your participation.
          </Text>

          <Group justify="center" gap="md">
            <Button
              leftSection={<IconDownload size="1rem" />}
              onClick={handleExportCSV}
              variant="light"
            >
              Download CSV for this questionnaire
            </Button>
            <Button
              leftSection={<IconDownload size="1rem" />}
              onClick={handleExportAllCSV}
              variant="outline"
            >
              Download all responses
            </Button>
          </Group>

          <Text size="sm" c="dimmed" mt="lg">
            Returning to the home page in 3 seconds...
          </Text>
        </Paper>
      </Container>
    );
  }

  const currentPageData = questionnaire.pages[currentPage];
  const totalPages = questionnaire.pages.length;
  // Progress based on answered items across the entire questionnaire
  const allItems = questionnaire.pages.flatMap((p) =>
    p.sections.flatMap((s) => s.items)
  );
  const totalItems = allItems.length;
  const answeredItems = allItems.reduce((count, item) => {
    const v = responses[item.id];
    const hasValue =
      v !== undefined &&
      v !== null &&
      (typeof v === "number" ||
        (typeof v === "string" && v.length > 0) ||
        (Array.isArray(v) && v.length > 0));
    return count + (hasValue ? 1 : 0);
  }, 0);
  const progress = totalItems > 0 ? (answeredItems / totalItems) * 100 : 0;
  const isLastPage = currentPage >= totalPages - 1;

  return (
    <>
      <header
        style={{ position: "sticky", top: 0, zIndex: 10, background: "white" }}
      >
        {/* Header */}
        <Group justify="flex-start" mb="md" p="lg">
          <div>
            <Title order={2}>{questionnaire.name}</Title>
            <Text c="dimmed">{questionnaire.description}</Text>
          </div>
          <Progress value={progress} flex={1} size="lg" />
          <Group>
            <Text size="sm" c="dimmed" ta="center">
              {Math.round(progress)}% ({answeredItems}/{totalItems})
            </Text>
            <Badge variant="light">
              {currentPage + 1} / {totalPages}
            </Badge>
          </Group>
        </Group>
      </header>

      <Container size="md">
        <Stack gap="lg">
          {/* Content */}
          {currentPageData?.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <Stack gap="lg">
                <Title order={3} mb="sm">
                  {section.title}
                </Title>
                {section.description && (
                  <Text c="dimmed" mb="lg">
                    {section.description}
                  </Text>
                )}
              </Stack>
              <Stack gap="sm">
                {section.items.map((item) => (
                  <QuestionItem
                    key={item.id}
                    item={item}
                    value={responses[item.id]}
                    onChange={(value) => handleResponse(item.id, value)}
                    error={errors[item.id]}
                  />
                ))}
              </Stack>
            </div>
          ))}

          {/* Navigation */}
          <Paper shadow="sm" p="lg" radius="md">
            <Group justify="space-between">
              <Button
                variant="outline"
                leftSection={<IconChevronLeft size="1rem" />}
                onClick={handlePrevious}
                disabled={currentPage === 0}
              >
                Back
              </Button>

              <Button
                rightSection={
                  isLastPage ? (
                    <IconCheck size="1rem" />
                  ) : (
                    <IconChevronRight size="1rem" />
                  )
                }
                onClick={handleNext}
                color={isLastPage ? "green" : undefined}
              >
                {isLastPage ? "Finish" : "Next"}
              </Button>
            </Group>
          </Paper>
        </Stack>
      </Container>
    </>
  );
}
