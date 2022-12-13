import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      Inspired by
      <a
        className="link"
        href="https://github.com/bchiang7/v4"
        target="__blank"
      >
        Brittany Chiang
      </a>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-lighter);

  @media (max-width: 1500px) {
    padding-bottom: 50px;
  }

  a {
    margin-left: 5px;
  }
`;

export default Footer;
