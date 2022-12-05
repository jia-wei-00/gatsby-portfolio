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
                layout: FULL_WIDTH
                formats: [AUTO, WEBP]
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  `);

  const { html } = data.markdownRemark;
  const image = getImage(data.markdownRemark.frontmatter.image.childImageSharp);

  return (
    <Container className="container" id="about">
      <h2 className="numbered-heading">About Me</h2>
      <div>
        <StyledImage image={image} />
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
    column-gap: 10px;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      display: block;
      flex-direction: column;
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
`;

export default About;
