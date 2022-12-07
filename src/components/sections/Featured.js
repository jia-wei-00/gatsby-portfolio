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

            return (
              <ProjectContainer>
                <Image image={getImage(cover.childImageSharp)} />
                <Project>
                  <h3>{title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: html }} />

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
                </Project>
              </ProjectContainer>
            );
          })}
      </Container>
    </div>
  );
};

const Image = styled(GatsbyImage)`
  height: 15vw;
  border-radius: 10px;
  object-position: center top;

  @media (max-width: 768px) {
    height: 40vw;
  }
`;

const Container = styled.div`
  display: grid;
  row-gap: 50px;
`;

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Project = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  row-gap: 20px;
  margin-top: 20px;

  h3 {
    color: var(--color-white);
  }

  p {
    text-align: justify;
  }
`;

export default Featured;
