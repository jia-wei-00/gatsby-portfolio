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
import { Analytics } from "@vercel/analytics/react";

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
      <Analytics />
      <Helmet>
        <meta name="icon" href={favicon} />
        <meta
          name="google-site-verification"
          content="DDRi_eR5BjqBNxcVQ8-IzV7B6He_W3r89WjdmRhY99k"
        />
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
