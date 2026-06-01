import { useState } from "react";
import styled from "styled-components";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { motion } from "framer-motion";
import { projects } from "../../data/projects";

const Projects = () => {
  const [show, setShow] = useState(false);

  return (
    <Container className="container">
      <h3>More Projects</h3>
      <ProjectContainer>
        {projects.slice(0, show ? 999 : 6).map(({ title, github, external, tech, video, html }, i) => (
          <Box
            as={motion.div}
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="info">
              <h3>{title}</h3>
              <div dangerouslySetInnerHTML={{ __html: html }} />
              <ul className="tech">
                {tech.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="icon">
              <a href={github && github.length > 0 ? github[0] : video} target="__blank">
                {github && github.length > 0 ? <GitHubIcon /> : <YouTubeIcon />}
              </a>
              <a href={external} target="__blank">
                <OpenInNewIcon />
              </a>
            </div>
          </Box>
        ))}
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
  height: 100%;
  padding: 30px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 10fr 1fr;
  column-gap: 10px;
  align-items: flex-end;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px) !important;
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
