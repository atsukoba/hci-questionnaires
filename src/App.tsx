import { AppShell, Burger, Group, MantineProvider, Title } from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "@tanstack/react-router";
import { Provider as JotaiProvider } from "jotai";
import { Sidebar } from "./components/sidebar";

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <JotaiProvider>
      <MantineProvider>
        <AppShell
          w={"100vw"}
          h={"auto"}
          navbar={{
            width: 280,
            breakpoint: "md",
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Navbar p="md">
            <Sidebar />
          </AppShell.Navbar>
          <AppShell.Main w="100%">
            <Outlet />
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </JotaiProvider>
  );
}

export default App;
