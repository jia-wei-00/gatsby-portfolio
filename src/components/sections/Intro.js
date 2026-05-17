import React from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
import { motion } from "framer-motion";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  height: 100vh;
  align-items: center;
  text-align: right;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    row-gap: 20px;
  }

  & > p {
    color: var(--color-lighter);
  }

  & > h2 {
    margin: 10px 0;
  }

  & > h1 {
    margin: 10px 0;
  }
`;

const Intro = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          contact
          description
          title
          sign
        }
      }
      file(relativePath: { eq: "leong_jia_wei.pdf" }) {
        publicURL
      }
    }
  `);

  const { title, description, sign } = data.site.siteMetadata;

  return (
    <Container>
      <div className="container">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }}>Hi, my name is</motion.p>
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>{title}</motion.h1>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }}>{sign}</motion.h2>
        <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>{description}</motion.h4>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }}>
          <a
            href={data.file.publicURL}
            target="__blank"
            download="leong_jia_wei_resume.pdf"
          >
            <button className="btn">Resume</button>
          </a>
        </motion.div>
      </div>
    </Container>
  );
};

export default Intro;
