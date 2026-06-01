import { useContext } from "react";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { ScrollContext } from "react-scroll-section";

type SectionId = "about" | "work" | "project" | "contact" | null;

const NavMobile = () => {
  const { scrollTo, selected } = useContext(ScrollContext);
  const activeSection = selected as SectionId;

  return (
    <Navigation $section={activeSection}>
      <NavSection
        onClick={() => scrollTo("about")}
        className={selected === "about" ? "active" : undefined}
      >
        <span>
          <PersonIcon />
        </span>
        <span>About</span>
      </NavSection>
      <NavSection
        onClick={() => scrollTo("work")}
        className={selected === "work" ? "active" : undefined}
      >
        <span>
          <WorkHistoryIcon />
        </span>
        <span>Work</span>
      </NavSection>
      <NavSection
        onClick={() => scrollTo("project")}
        className={selected === "project" ? "active" : undefined}
      >
        <span>
          <PendingActionsIcon />
        </span>
        <span>Projects</span>
      </NavSection>
      <NavSection
        onClick={() => scrollTo("contact")}
        className={selected === "contact" ? "active" : undefined}
      >
        <span>
          <ContactMailIcon />
        </span>
        <span>Contact</span>
      </NavSection>
      <div className="indicator"></div>
    </Navigation>
  );
};

export default NavMobile;

const Navigation = styled.div<{ $section: SectionId }>`
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
    transform: ${({ $section }) => {
      if ($section === "work") return "translateX(65px)";
      if ($section === "project") return "translateX(calc(65px * 2))";
      if ($section === "contact") return "translateX(calc(65px * 3))";
      return undefined;
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

const NavSection = styled.li`
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
