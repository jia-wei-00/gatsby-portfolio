import styled from "styled-components";
import { motion } from "framer-motion";
import { aboutHtml, skills } from "../../data/about";
import meImage from "../../about/me.jpg";

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
      <ImageWrapper>
        <StyledImage src={meImage} alt="Jia Wei" />
      </ImageWrapper>
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

const ImageWrapper = styled.div`
  position: relative;
  max-width: 300px;
  width: 100%;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin: 0 auto 2.5rem;
  }

  &::after {
    content: "";
    position: absolute;
    top: -15px;
    right: -15px;
    bottom: -15px;
    left: -15px;
    border: 3px solid var(--color-lighter);
    border-radius: 25px;
    z-index: 0;
    opacity: 0;
    transition: var(--transition);
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  border-radius: 10px;
  aspect-ratio: 1;
  object-fit: cover;
  cursor: pointer;
  transition: var(--transition);
  filter: grayscale(70%);
  position: relative;
  z-index: 1;

  ${ImageWrapper}:hover & {
    filter: grayscale(0);
  }
`;

export default About;
