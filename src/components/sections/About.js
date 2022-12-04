import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { slug: { eq: "about" } }) {
        html
      }
    }
  `);

  const { html } = data.markdownRemark;

  return (
    <Container className="container">
      <h2 className="numbered-heading">About Me</h2>
      <div>
        <img></img>
        <Desc dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;

  & > h2 {
    display: flex;
  }

  & > div {
    display: grid;
    grid-template-columns: 2fr 3fr;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const Desc = styled.div`
  text-align: justify;
`;

export default About;
