import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";

const Projects = () => {
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

  console.log(data);

  return (
    <div className="container">
      <h3>More Projects</h3>
      <ProjectContainer>
        {/* {
            data.
        } */}
        <Box></Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
      </ProjectContainer>
    </div>
  );
};

const Box = styled.div`
  width: 100%;
  background: white;
  height: 200px;
`;

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 20px;
  row-gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: auto auto;
  }
`;

export default Projects;
