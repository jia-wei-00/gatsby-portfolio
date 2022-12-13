import React from "react";
import styled from "styled-components";
import { Github, Linkedin, Whatsapp } from "./Svg.js";
import { motion } from "framer-motion";
import { useStaticQuery, graphql } from "gatsby";

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  bottom: 0;
  left: calc(1rem + 2vw);
  transform: translateX(-50%);

  z-index: 3;

  & > *:not(:last-child) {
    margin: 0.5rem 0;
  }
`;

const Line = styled(motion.span)`
  width: 2px;
  height: 8rem;
  background-color: var(--color-lighter);
`;

const SocialIcons = () => {
  const data = useStaticQuery(graphql`
    query {
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
    <Icons>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: [1, 1.2, 1] }}
        transition={{ type: "spring", duration: 1, delay: 1 }}
      >
        <a style={{ color: "white" }} target="_blank" href={whatsapp}>
          <Whatsapp />
        </a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: [1, 1.2, 1] }}
        transition={{ type: "spring", duration: 1, delay: 1.2 }}
      >
        <a style={{ color: "white" }} target="_blank" href={github}>
          <Github />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: [1, 1.2, 1] }}
        transition={{ type: "spring", duration: 1, delay: 1.4 }}
      >
        <a style={{ color: "white" }} target="_blank" href={linkedin}>
          <Linkedin />
        </a>
      </motion.div>

      <Line
        initial={{ height: 0 }}
        animate={{ height: "8rem" }}
        transition={{ type: "spring", duration: 1, delay: 0.8 }}
        color="white"
      />
    </Icons>
  );
};

export default SocialIcons;
