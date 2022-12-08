import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Featured = () => {
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

  console.log(projects);

  return (
    <div className="container">
      <h2 className="numbered-heading">Featured Projects</h2>
      <Container>
        {projects &&
          projects.map(({ node }, i) => {
            const { cover, external, github, title, video, tech } =
              node.frontmatter;

            const html = node.html;
            console.log(tech);

            return (
              <ProjectContainer>
                <Image
                  image={getImage(cover.childImageSharp)}
                  className="image"
                />
                <Project className="project">
                  <h3>{title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                  <ul>
                    {tech.map((tech, i) => {
                      <li key={i}>{tech}</li>;
                    })}
                  </ul>
                  <div className="icon-wrapper">
                    {github ? (
                      <a href={github} target="_blank">
                        <GitHubIcon />
                      </a>
                    ) : (
                      <a href={video} target="_blank">
                        <YouTubeIcon />
                      </a>
                    )}
                    <a href={external} target="_blank">
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
  object-position: center top;
  width: 100%;
  transition: var(--transition);
  filter: grayscale(70%) blur(3px);
  /* transform: translateX(50px); */

  @media (max-width: 768px) {
    height: 40vw;
    transform: translateY(50px);
  }
`;

const Container = styled.div`
  display: grid;
  row-gap: 50px;

  @media (max-width: 768px) {
    row-gap: 0;
  }
`;

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 4fr;
  column-gap: 50px;
  position: relative;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    .project,
    .image {
      transform: translateX(0);
    }

    .project {
      box-shadow: 5px 5px 5px 0px var(--color-primary);
    }

    .image {
      filter: grayscale(0) blur(0);
    }
  }
`;

const Project = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  row-gap: 20px;
  background-color: var(--color-darkbg);
  border: 1px solid var(--color-brighter);
  padding: 20px;
  border-radius: 20px;
  left: 50%;
  transition: var(--transition);
  z-index: 1;
  transform: translateX(-100px);

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

  @media (max-width: 768px) {
    margin-top: 20px;
    width: 95%;
    transform: translateY(-50px);
  }
`;

export default Featured;
