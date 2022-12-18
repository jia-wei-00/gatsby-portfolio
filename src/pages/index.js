import React from "react";
import "../styles/global.css";
import {
  Layout,
  Intro,
  About,
  Work,
  Featured,
  Projects,
  Contact,
  SocialIcons,
  Footer,
} from "@components";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ScrollingProvider, Section } from "react-scroll-section";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

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

export default function Home({ data }) {
  const breakpoints = useBreakpoint();

  const { favicon, title } = data.site.siteMetadata;

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta name="icon" href={favicon} />
        <title>{title}</title>
      </Helmet>
      <ScrollingProvider>
        <Layout>
          {breakpoints.xl ? <Intro /> : null}
          <Section id="about" className="offset">
            <About />
          </Section>
          <Section id="work" className="offset">
            <Work />
          </Section>
          <Section id="project" className="offset">
            <Featured />
            <Projects />
          </Section>
          <Section id="contact" className="offset">
            <Contact />
          </Section>
          {breakpoints.sm ? null : <SocialIcons />}
          <Footer />
        </Layout>
      </ScrollingProvider>
    </ThemeProvider>
  );
}

export const data = graphql`
  query {
    site {
      siteMetadata {
        favicon
        title
      }
    }
  }
`;
