import * as React from "react";
import "../styles/global.css";
import { Layout, Intro, About } from "@components";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

export default function Home() {
  const breakpoints = useBreakpoint();

  return (
    <Layout>
      {breakpoints.xl ? <Intro /> : null}
      <About />
    </Layout>
  );
}
