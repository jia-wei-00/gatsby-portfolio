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
    margin: 10px 0;
  }

  & > h1 {
    margin: 10px 0;
  }
`;

const Intro = () => {
  const data = useStaticQuery(graphql`
    query {
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

  const { title, description, contact, sign } = data.site.siteMetadata;

  return (
    <Container>
      <div className="container">
        <p>Hi, my name is</p>
        <h1>{title}</h1>
        <h2>{sign}</h2>
        <h4>{description}</h4>
        <button className="btn">Resume</button>
      </div>
    </Container>
  );
};

export default Intro;
