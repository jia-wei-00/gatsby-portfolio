import React from "react";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { useScrollSection } from "react-scroll-section";

const NavMobile = ({ section }) => {
  const aboutSection = useScrollSection("about");
  const workSection = useScrollSection("work");
  const projectSection = useScrollSection("project");
  const contactSection = useScrollSection("contact");

  return (
    <Navigation
      section={
        aboutSection.selected
          ? "about"
          : workSection.selected
          ? "work"
          : projectSection.selected
          ? "project"
          : contactSection.selected
          ? "contact"
          : null
      }
    >
      <Section
        onClick={aboutSection.onClick}
        className={aboutSection.selected && "active"}
      >
        <span>
          <PersonIcon />
        </span>
        <span>About</span>
      </Section>
      <Section
        onClick={workSection.onClick}
        className={workSection.selected && "active"}
      >
        <span>
          <WorkHistoryIcon />
        </span>
        <span>Work</span>
      </Section>
      <Section
        onClick={projectSection.onClick}
        className={projectSection.selected && "active"}
      >
        <span>
          <PendingActionsIcon />
        </span>
        <span>Projects</span>
      </Section>
      <Section
        onClick={contactSection.onClick}
        className={contactSection.selected && "active"}
      >
        <span>
          <ContactMailIcon />
        </span>
        <span>Contact</span>
      </Section>
      <div className="indicator"></div>
    </Navigation>
  );
};

export default NavMobile;

const Navigation = styled.div`
  background: rgba(0, 0, 0, 0.3);
  width: max-content;
  padding: 0.7rem 1.7rem;
  z-index: 2;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2rem;
  display: flex;
  gap: 0.8rem;
  border-radius: 3rem;
  backdrop-filter: blur(15px);

  .indicator {
    position: absolute;
    top: -12%;
    width: 52px;
    height: 52px;
    background: var(--color-primary);
    border-radius: 50%;
    transition: 0.5s;
    transform: ${(props) => {
      if (props.section === "work") {
        return `
          translateX(65px);
        `;
      } else if (props.section === "project") {
        return `
          translateX(calc(65px * 2));
        `;
      } else if (props.section === "contact") {
        return `
          translateX(calc(65px * 3));
        `;
      }
    }};
  }

  .indicator::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -22px;
    width: 20px;
    height: 20px;
    background: transparent;
    border-top-right-radius: 20px;
  }

  .indicator::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -22px;
    width: 20px;
    height: 20px;
    background: transparent;
  }
`;

const Section = styled.li`
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 1;

  &.active > span {
    &:nth-child(2) {
      opacity: 1;
      bottom: 0;
    }

    &:first-child {
      transform: translateY(-20px);
    }
  }

  & > span:first-child {
    background: transparent;
    padding: 0.9rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-light);
    font-size: 1.1rem;
    width: 52px;
    height: 52px;
    transition: var(--transition);

    &:hover {
      background: rgba(0, 0, 0, 0.2);
      color: var(--color-white);
    }
  }

  & > span:nth-child(2) {
    position: absolute;
    color: rgba(225, 225, 225, 0.7);
    font-weight: 400;
    font-size: 0.75em;
    letter-spacing: 0.05em;
    transition: 0.5s;
    opacity: 0;
    display: flex;
    margin-left: 50%;
    left: 0;
    bottom: -10px;
    transform: translateX(-50%);
  }
`;
