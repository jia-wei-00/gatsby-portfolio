import * as React from "react";
import "../styles/global.css";
import { Layout, Intro, About, Work } from "@components";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(124, 30, 196)",
    },
    secondary: {
      main: "rgba(255, 255, 255, 0.8)",
    },
  },
});

export default function Home() {
  const breakpoints = useBreakpoint();

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        {breakpoints.xl ? <Intro /> : null}
        <About />
        <Work />
      </Layout>
    </ThemeProvider>
  );
}
