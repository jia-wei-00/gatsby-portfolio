import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { slug: { eq: "about" } }) {
        html
        frontmatter {
          image {
            childImageSharp {
              gatsbyImageData(
                width: 700
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  `);

  const { html } = data.markdownRemark;
  const image = getImage(data.markdownRemark.frontmatter.image.childImageSharp);
  const skills = [
    "Javascript",
    "React",
    "Redux",
    "Firebase",
    "Styled Components",
    "Gatsby",
    "WordPress",
  ];

  return (
    <Container className="container" id="about">
      <h2 className="numbered-heading">About Me</h2>
      <div>
        <StyledImage className="swirl-in-fwd" image={image} />
        <div>
          <Desc dangerouslySetInnerHTML={{ __html: html }} />
          <br />
          <p>Here are a few technologies I’ve been working with recently:</p>
          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    display: grid;
    grid-template-columns: 2fr 3fr;
    column-gap: 50px;
    justify-content: center;
    align-items: flex-start;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;

    li {
      color: var(--color-lighter);
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: var(--color-lighter);
        line-height: 12px;
      }
    }
  }
`;

const Desc = styled.div`
  text-align: justify;
`;

const StyledImage = styled(GatsbyImage)`
  max-width: 300px;
  border-radius: 10px;
  margin-bottom: 40px;

  aspect-ratio: 1;
  outline: 0 solid;
  outline-offset: calc(300px / -2);
  cursor: pointer;
  transition: var(--transition);
  filter: grayscale(70%);

  &:hover {
    outline: 3px solid var(--color-lighter);
    outline-offset: 15px;
    filter: grayscale(0);
  }

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default About;
