import Logo from "./Logo";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Github, Linkedin, Whatsapp } from "./Svg";
import { motion } from "framer-motion";
import { siteMetadata } from "../data/siteMetadata";
import { useBreakpoint } from "../hooks/useBreakpoint";
import resumeUrl from "../images/leong_jia_wei.pdf?url";

const { linkedin, github, whatsapp } = siteMetadata;

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<string | null>(null);

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
    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [scrollDirection]);

  return scrollDirection;
}

const MobileHeader = () => {
  const breakpoints = useBreakpoint();
  const scrollDirection = useScrollDirection();

  return (
    <Container $scroll={scrollDirection}>
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
          <a className="link" href={resumeUrl} target="__blank">
            Resume
          </a>
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div<{ $scroll: string | null }>`
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
  transform: ${({ $scroll }) =>
    $scroll === "down" ? "translateY(-100%)" : null};

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
