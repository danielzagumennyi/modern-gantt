import { Container, MantineProvider, Switch } from "@mantine/core";
import { useState } from "react";

import "@mantine/core/styles.css";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { DefaultGanttExample } from "./examples/Default/DefaultGanttExample";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    <MantineProvider defaultColorScheme={theme} forceColorScheme={theme}>
      <Container>
        <Switch
          checked={theme === "dark"}
          onChange={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
          size="md"
          color="dark.4"
          onLabel={
            <IconSun
              size={16}
              stroke={2.5}
              color="var(--mantine-color-yellow-4)"
            />
          }
          offLabel={
            <IconMoonStars
              size={16}
              stroke={2.5}
              color="var(--mantine-color-blue-6)"
            />
          }
        />
        <DefaultGanttExample />
      </Container>
    </MantineProvider>
  );
}

export default App;
