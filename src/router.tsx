import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import App from "./App";
import { HomePage } from "./pages/home";
import { QuestionnairePage } from "./pages/questionnaire";
import { BuilderPage } from "./pages/builder";

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <App />
      <TanStackRouterDevtools />
    </>
  ),
});

// Home route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

// Builder route
const builderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/builder",
  component: BuilderPage,
});

// Questionnaire route
const questionnaireRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$questionnaireId",
  component: QuestionnairePage,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  builderRoute,
  questionnaireRoute,
]);

// Create the router instance
export const router = createRouter({ routeTree });
