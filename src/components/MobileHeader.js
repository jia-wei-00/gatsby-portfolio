import { Logo } from "@components";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
import Slide from "react-reveal/Slide";

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return scrollDirection;
}

const MobileHeader = () => {
  const scrollDirection = useScrollDirection();
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "resume.pdf" }) {
        publicURL
      }
    }
  `);

  return (
    <Slide top>
      <Container scroll={scrollDirection}>
        <div>
          <Logo />

          <button>
            <a className="link" href={data.file.publicURL} target="__blank">
              Resume
            </a>
          </button>
        </div>
      </Container>
    </Slide>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  width: 100%;
  backdrop-filter: blur(15px);
  background: rgba(0, 0, 0, 0.5);
  box-shadow: -1px 1px 14px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 1px 14px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 1px 14px 0px rgba(0, 0, 0, 0.75);
  transition: var(--transition);
  transform: ${(props) =>
    props.scroll === "down" ? `translateY(-100%)` : null};

  & > div {
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > button {
      cursor: pointer;
      color: var(--color-lighter);
      background: transparent;
    }
  }
`;

export default MobileHeader;
