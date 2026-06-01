import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { jobs } from "../../data/jobs";
import type { ReactNode } from "react";

interface TabPanelProps {
  children: ReactNode;
  value: number;
  index: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Desc = styled.div`
  & > ul {
    display: grid;
    row-gap: 12px;
    margin-top: 20px;

    & > li {
      color: var(--color-light);
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
    }
  }

  & > ul > li:before {
    content: "▹";
    position: absolute;
    left: 0;
  }
`;

export default function Work() {
  const breakpoints = useBreakpoint();
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="numbered-heading">Working History</h2>
      </motion.div>
      <Box
        sx={
          breakpoints.xs
            ? { bgcolor: "none", display: "grid" }
            : { bgcolor: "none", display: "grid", gridTemplateColumns: "1fr 4fr" }
        }
      >
        <Tabs
          orientation={breakpoints.xs ? "horizontal" : "vertical"}
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="primary"
          sx={{
            "& button": { color: "rgb(225,225,225,0.6)", fontSize: "12px" },
            "& button:hover": { color: "white" },
          }}
          aria-label="work history tabs"
        >
          {jobs.map(({ company }, i) => (
            <Tab key={i} label={company} {...a11yProps(i)} />
          ))}
        </Tabs>

        {jobs.map(({ company, location, range, title, url, html }, i) => (
          <TabPanel key={i} value={value} index={i}>
            <h3>
              <span>{title}</span>
              <span className="company">
                &nbsp;@&nbsp;
                <a href={url} className="link">
                  {company}
                </a>
              </span>
            </h3>
            <p className="range">{range}</p>
            <p>{location}</p>
            <Desc dangerouslySetInnerHTML={{ __html: html }} />
          </TabPanel>
        ))}
      </Box>
    </div>
  );
}
