import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";

const Logo = () => {
  const data = useStaticQuery(graphql`
    query Banner {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  `);

  const image = getImage(data.file.childImageSharp);

  return (
    <Container>
      <GatsbyImage image={image} />
      <p>J</p>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 70px;

  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  & img {
    -webkit-animation: rotating 4s linear infinite;
    -moz-animation: rotating 4s linear infinite;
    -ms-animation: rotating 4s linear infinite;
    -o-animation: rotating 4s linear infinite;
    animation: rotating 4s linear infinite;
  }

  & > p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Logo;
