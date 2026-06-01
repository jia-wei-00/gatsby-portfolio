import "./styles/global.css";
import {
  Layout,
  About,
  Work,
  Featured,
  Projects,
  Contact,
  SocialIcons,
  Footer,
} from "@components";
import { useBreakpoint } from "./hooks/useBreakpoint";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ScrollingProvider, Section } from "react-scroll-section";
import { Analytics } from "@vercel/analytics/react";
import Intro from "./components/sections/Intro";

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

function App() {
  const breakpoints = useBreakpoint();

  return (
    <ThemeProvider theme={theme}>
      <Analytics />
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

export default App;
