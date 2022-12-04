import React from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  height: 100vh;
  align-items: center;
  text-align: right;
  width: 100%;

  & > p {
    color: var(--color-lighter);
  }

  & > h2 {
    margin-bottom: 10px;
  }
`;

const About = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      site {
        siteMetadata {
          contact
          description
          title
          sign
        }
      }
    }
  `);

  console.log(data.site);
  const { title, description, contact, sign } = data.site.siteMetadata;

  return (
    <Container>
      <div className="container">
        <p>Hi, my name is</p>
        <h1>{title}</h1>
        <h2>{sign}</h2>
        <h4>{description}</h4>
      </div>
    </Container>
  );
};

export default About;
