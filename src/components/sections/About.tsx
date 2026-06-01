import styled from "styled-components";
import { motion } from "framer-motion";
import { aboutHtml } from "../../data/about";
import meImage from "../../about/me.jpg";

const skills = [
  "Openai SDK",
  "Vercel AI SDK",
  "Typescript",
  "React",
  "React Native",
  "Vue",
  "Zustand",
  "Tanstack Query",
  "Pinia",
  "Firebase",
  "Supabase",
  "Scss",
];

const About = () => (
  <Container className="container">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="numbered-heading">About Me</h2>
    </motion.div>
    <div>
      <StyledImage src={meImage} alt="Jia Wei" />
      <div>
        <Desc dangerouslySetInnerHTML={{ __html: aboutHtml }} />
        <br />
        <p>Here are a few technologies I've been working with recently:</p>
        <ul className="skills-list">
          {skills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    display: grid;
    grid-template-columns: 2fr 3fr;
    column-gap: 50px;
    justify-content: center;
    align-items: flex-start;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;

    li {
      color: var(--color-lighter);
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-size: var(--fz-xs);

      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: var(--color-lighter);
        line-height: 12px;
      }
    }
  }
`;

const Desc = styled.div`
  text-align: justify;
`;

const StyledImage = styled.img`
  display: block;
  max-width: 300px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 40px;
  aspect-ratio: 1;
  object-fit: cover;
  outline: 0 solid;
  outline-offset: calc(300px / -2);
  cursor: pointer;
  transition: var(--transition);
  filter: grayscale(70%);

  &:hover {
    outline: 3px solid var(--color-lighter);
    outline-offset: 15px;
    filter: grayscale(0);
  }

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default About;
