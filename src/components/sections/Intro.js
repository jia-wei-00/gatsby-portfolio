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
      file(relativePath: { eq: "resume.pdf" }) {
        publicURL
      }
    }
  `);

  const { title, description, sign } = data.site.siteMetadata;

  return (
    <Container>
      <div className="container">
        <Fade delay={250}>
          <p>Hi, my name is</p>
        </Fade>
        <Fade delay={500}>
          <h1>{title}</h1>
        </Fade>
        <Fade delay={700}>
          <h2>{sign}</h2>
        </Fade>
        <Fade delay={800}>
          <h4>{description}</h4>
        </Fade>
        <Fade delay={900}>
          <a href={data.file.publicURL} target="__blank">
            <button className="btn">Resume</button>
          </a>
        </Fade>
      </div>
    </Container>
  );
};

export default Intro;
