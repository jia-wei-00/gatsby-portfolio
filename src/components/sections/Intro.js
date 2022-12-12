import React from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
import Fade from "react-reveal/Fade";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  height: 100vh;
  align-items: center;
  text-align: right;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    row-gap: 20px;
  }

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

  const { title, description, sign } = data.site.siteMetadata;

  return (
    <Container>
      <div className="container">
        <Fade>
          <p>Hi, my name is</p>
        </Fade>
        <Fade duration={1000}>
          <h1>{title}</h1>
        </Fade>
        <Fade duration={2000}>
          <h2>{sign}</h2>
        </Fade>
        <Fade duration={3000}>
          <h4>{description}</h4>
        </Fade>
        <Fade duration={4000}>
          <button className="btn">Resume</button>
        </Fade>
      </div>
    </Container>
  );
};

export default Intro;
