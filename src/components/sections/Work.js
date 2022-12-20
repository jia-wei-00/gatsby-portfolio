import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
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

export default function Work({ children }) {
  const breakpoints = useBreakpoint();
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { frontmatter: { slug: { eq: "jobs" } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          frontmatter {
            company
            date
            location
            range
            title
            url
          }
          html
        }
      }
    }
  `);

  const jobsData = data.jobs.nodes;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container">
      {children}
      <Fade bottom>
        <h2 className="numbered-heading">Working History</h2>
      </Fade>
      <Box
        sx={
          breakpoints.xs
            ? {
                bgcolor: "none",
                display: "grid",
              }
            : {
                bgcolor: "none",
                display: "grid",
                gridTemplateColumns: "1fr 4fr",
              }
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
          aria-label="secondary tabs example"
        >
          {jobsData &&
            jobsData.map(({ frontmatter }, i) => {
              const { company } = frontmatter;
              return (
                <Tab
                  // style={{ width: "100px" }}
                  label={company}
                  {...a11yProps(i)}
                />
              );
            })}
        </Tabs>

        {jobsData &&
          jobsData.map(({ frontmatter, html }, i) => {
            const { company, location, range, title, url } = frontmatter;

            return (
              <TabPanel value={value} index={i}>
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
            );
          })}
      </Box>
    </div>
  );
}
