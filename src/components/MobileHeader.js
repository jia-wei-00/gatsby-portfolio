import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";

const MobileHeader = () => {
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
      <div>
        <Logo>
          <GatsbyImage image={image} />
          <p>J</p>
        </Logo>
        <button className="btn">Resume</button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: -1px 1px 14px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 1px 14px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 1px 14px 0px rgba(0, 0, 0, 0.75);

  & > div {
    width: 95%;
    display: flex;
    justify-content: space-between;

    & > button {
      display: inline-block;
      text-decoration: none;
      text-decoration-skip-ink: auto;
      position: relative;
      transition: var(--transition);
      cursor: pointer;
      color: var(--green);
    }
  }
`;

const Logo = styled.div`
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

export default MobileHeader;
