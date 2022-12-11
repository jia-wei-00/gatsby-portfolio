import React, { useState } from "react";
import "../styles/global.css";
import {
  Layout,
  Intro,
  About,
  Work,
  Featured,
  Projects,
  Contact,
} from "@components";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ScrollingProvider, Section } from "react-scroll-section";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(124, 30, 196)",
    },
    secondary: {
      main: "rgba(255, 255, 255, 1)",
    },
  },
});

export default function Home() {
  const breakpoints = useBreakpoint();

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        {breakpoints.xl ? <Intro /> : null}
        <Section id="about">
          <About />
        </Section>
        <Section id="work">
          <Work />
        </Section>
        <Section id="project">
          <Featured />
          <Projects />
        </Section>
        <Section id="contact">
          <Contact />
        </Section>
      </Layout>
    </ThemeProvider>
  );
}
