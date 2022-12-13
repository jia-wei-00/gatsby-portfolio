import { Logo } from "@components";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import { Github, Linkedin, Whatsapp } from "./Svg.js";
import { motion } from "framer-motion";

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
  const breakpoints = useBreakpoint();
  const scrollDirection = useScrollDirection();
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "resume.pdf" }) {
        publicURL
      }
      site {
        siteMetadata {
          linkedin
          github
          whatsapp
        }
      }
    }
  `);

  const { linkedin, github, whatsapp } = data.site.siteMetadata;

  return (
    <Container scroll={scrollDirection}>
      <div>
        <Logo />

        {breakpoints.sm ? (
          <Icons
            initial={{ width: 0 }}
            animate={{ width: "160px" }}
            transition={{ type: "spring", duration: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1, 1.2, 1] }}
              transition={{ type: "spring", duration: 1, delay: 1 }}
              className="icon"
            >
              <a style={{ color: "white" }} target="_blank" href={whatsapp}>
                <Whatsapp />
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1, 1.2, 1] }}
              transition={{ type: "spring", duration: 1, delay: 1.2 }}
              className="icon"
            >
              <a style={{ color: "white" }} target="_blank" href={github}>
                <Github />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1, 1.2, 1] }}
              transition={{ type: "spring", duration: 1, delay: 1.4 }}
              className="icon"
            >
              <a style={{ color: "white" }} target="_blank" href={linkedin}>
                <Linkedin />
              </a>
            </motion.div>
          </Icons>
        ) : null}

        <button>
          <a className="link" href={data.file.publicURL} target="__blank">
            Resume
          </a>
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  animation-name: slidedown;
  animation-duration: 0.5s;

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

const Icons = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  background-color: var(--color-primary);
  padding: 8px 20px;
  border-radius: 25px;
  transform: scale(0.9);

  .icon:hover {
    transition: var(--transition);
    transform: scale(0.85) !important;
  }
`;

export default MobileHeader;
