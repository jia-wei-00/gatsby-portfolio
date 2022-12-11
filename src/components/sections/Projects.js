import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Projects = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: { frontmatter: { slug: { eq: "project" } } }
        sort: { frontmatter: { date: ASC } }
      ) {
        edges {
          node {
            frontmatter {
              title
              github
              external
              tech
            }
            html
          }
        }
      }
    }
  `);

  const projects = data.projects.edges;

  const [show, setShow] = useState(false);

  return (
    <Container className="container">
      {children}
      <h3>More Projects</h3>
      <ProjectContainer>
        {projects.slice(0, show ? 999 : 6).map((project, i) => {
          const { title, github, external, tech } = project.node.frontmatter;
          const html = project.node.html;

          return (
            <Box>
              <div className="info">
                <h3>{title}</h3>
                <div dangerouslySetInnerHTML={{ __html: html }} />
                <ul className="tech">
                  {tech.map((tech, i) => {
                    return <li key={i}>{tech}</li>;
                  })}
                </ul>
              </div>
              <div className="icon">
                <a href={github} target="__blank">
                  <GitHubIcon />
                </a>
                <a href={external} target="__blank">
                  <OpenInNewIcon />
                </a>
              </div>
            </Box>
          );
        })}
      </ProjectContainer>
      <button className="btn" onClick={() => setShow(!show)}>
        Show {show ? "Less" : "More"}
      </button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const Box = styled.div`
  width: 100%;
  background: var(--color-darkbg);
  height: auto;
  padding: 30px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 10fr 1fr;
  column-gap: 10px;
  align-items: flex-end;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
  }

  .info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;

    & > div {
      padding: 30px 0;
      color: var(--color-light);
    }
  }

  .icon {
    display: flex;
    flex-direction: column;
    row-gap: 5px;

    & > a {
      transition: var(--transition);
      &:hover {
        transform: translateY(-5px);
      }
    }
  }

  .tech {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;

    li {
      margin: 0 20px 5px 0;
      color: var(--color-dull);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      li {
        margin: 0 10px 5px 0;
      }
    }
  }
`;

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 20px;
  margin-top: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 615px) {
    grid-template-columns: 1fr;
  }
`;

export default Projects;