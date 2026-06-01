import styled from "styled-components";
import { Github, Linkedin, Whatsapp } from "./Svg";
import { motion } from "framer-motion";
import { siteMetadata } from "../data/siteMetadata";

const { linkedin, github, whatsapp } = siteMetadata;

const SocialIcons = () => (
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
    />
  </Icons>
);

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

  svg:hover {
    transform: translateY(-5px);
    transition: var(--transition);
  }
`;

const Line = styled(motion.span)`
  width: 2px;
  height: 8rem;
  background-color: var(--color-lighter);
`;

export default SocialIcons;
