import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Fade from "react-reveal/Fade";

const Featured = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: { frontmatter: { slug: { eq: "featured" } } }
      ) {
        edges {
          node {
            frontmatter {
              external
              github
              cover {
                childImageSharp {
                  gatsbyImageData(
                    layout: FULL_WIDTH
                    formats: AUTO
                    placeholder: BLURRED
                    height: 300
                  )
                }
              }
              tech
              title
              video
            }
            html
          }
        }
      }
    }
  `);

  const projects = data.projects.edges;

  return (
    <div className="container">
      {children}
      <Fade bottom>
        <h2 className="numbered-heading">Featured Projects</h2>
      </Fade>
      <Container>
        {projects &&
          projects.map(({ node }, i) => {
            const { cover, external, github, title, video, tech } =
              node.frontmatter;

            const html = node.html;

            return (
              <ProjectContainer>
                <Image
                  image={getImage(cover.childImageSharp)}
                  className="image"
                />
                <Project className="project">
                  <h3>{title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                  <ul className="tech">
                    {tech.map((tech, i) => {
                      return <li key={i}>{tech}</li>;
                    })}
                  </ul>
                  <div className="icon-wrapper">
                    {github ? (
                      <a href={github} target="_blank" rel="noreferrer">
                        <GitHubIcon />
                      </a>
                    ) : (
                      <a href={video} target="_blank" rel="noreferrer">
                        <YouTubeIcon />
                      </a>
                    )}
                    <a href={external} target="_blank" rel="noreferrer">
                      <OpenInNewIcon />
                    </a>
                  </div>
                </Project>
              </ProjectContainer>
            );
          })}
      </Container>
    </div>
  );
};

const Image = styled(GatsbyImage)`
  height: 50vh;
  border-radius: 20px;
  width: 100%;
  transition: var(--transition);
  filter: grayscale(70%) blur(3px) brightness(40%);
  position: absolute;
  width: 50%;
  height: 100%;
  left: 0;

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: 40vw;
    transform: translateY(50px);
  }
`;

const Container = styled.div`
  display: grid;
  row-gap: 80px;

  @media (max-width: 768px) {
    row-gap: 0;
  }
`;

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 50px;
  position: relative;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &:nth-of-type(even) {
    .image {
      right: 0;
      left: unset;
    }

    &:hover {
      .project {
        box-shadow: -5px 5px 5px 0px var(--color-primary);
      }
    }

    .project {
      transform: translateX(40%);

      @media (max-width: 768px) {
        transform: translateX(0);
        transform: translateY(-25%);
      }
    }

    &:hover {
      .project {
        transform: translateX(0);
      }
    }
  }

  &:hover {
    .image {
      transform: translateX(0);
    }

    .project {
      transform: translateX(120%);
      box-shadow: 5px 5px 5px 0px var(--color-primary);

      @media (max-width: 768px) {
        transform: translateX(0);
      }
    }

    .image {
      filter: grayscale(0) blur(0);
    }
  }
`;

const Project = styled.div`
  display: grid;
  column-gap: 10px;
  row-gap: 25px;
  background: linear-gradient(
    130deg,
    transparent,
    var(--color-primary),
    transparent
  );
  border: 1px solid var(--color-brighter);
  padding: 20px;
  border-radius: 20px;
  left: 50%;
  transition: var(--transition);
  z-index: 1;
  max-width: 45%;
  right: 0;
  transform: translateX(80%);

  h3 {
    color: var(--color-white);
  }

  p {
    text-align: justify;
    color: var(--color-light);
  }

  .icon-wrapper {
    display: flex;
    column-gap: 10px;

    a {
      background-color: var(--color-dull);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      border-radius: 50%;
      border: 1px solid transparent;
      transition: var(--transition);

      &:hover {
        background-color: transparent;
        border-color: var(--color-white);
      }
    }
  }

  .tech {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    /* margin: 25px 0 10px; */
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--color-lighter);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      /* margin: 10px 0; */

      li {
        margin: 0 10px 5px 0;
        color: var(--color-lighter);
      }
    }
  }

  @media (max-width: 768px) {
    margin-top: 20px;
    width: 95%;
    transform: translateY(-25%);
    max-width: unset;
  }
`;

export default Featured;
