import {
  Badge,
  Divider,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconJumpRope } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { loadAllQuestionnaires } from "../utils/questionnaire-loader";
import { countAllItems } from "../utils/questionnaire-utils";

const questionnaires = await loadAllQuestionnaires();

export function Sidebar() {
  return (
    <ScrollArea h={"100vh"}>
      <Stack gap="md">
        <div>
          <Title order={4} mb="xs">
            Questionnaires
          </Title>
          <Text size="sm" c="dimmed">
            Select a questionnaire to get started
          </Text>
        </div>

        <NavLink
          component={Link}
          to="/builder"
          label={<Text fw={600}>Flow Builder</Text>}
          description={<Text size="xs">Generate answer URL</Text>}
          mb="sm"
          leftSection={<IconJumpRope size={24} stroke={1.5} />}
        />

        <Divider />

        <Stack gap="xs">
          {questionnaires.map((questionnaire) => (
            <NavLink
              key={questionnaire.id}
              component={Link}
              to={`/${questionnaire.id}`}
              label={
                <div>
                  <Text size="sm" fw={500}>
                    {questionnaire.name}
                  </Text>
                  <Text size="xs" c="dimmed" mt={2}>
                    {questionnaire.description}
                  </Text>
                </div>
              }
              rightSection={
                <Badge size="sm" variant="light">
                  {countAllItems(questionnaire)} items
                </Badge>
              }
            />
          ))}
        </Stack>
      </Stack>
    </ScrollArea>
  );
}
