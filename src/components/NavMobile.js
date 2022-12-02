import React, { useState } from "react";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const NavMobile = () => {
  const [active, setActive] = useState("about");

  return (
    <Navigation>
      <a
        className={active === "about" && "active"}
        onClick={() => setActive("about")}
      >
        <PersonIcon />
      </a>
      <a
        className={active === "work" && "active"}
        onClick={() => setActive("work")}
      >
        <WorkHistoryIcon />
      </a>
      <a
        className={active === "project" && "active"}
        onClick={() => setActive("project")}
      >
        <PendingActionsIcon />
      </a>
      <a
        className={active === "contact" && "active"}
        onClick={() => setActive("contact")}
      >
        <ContactMailIcon />
      </a>
    </Navigation>
  );
};

export default NavMobile;

const Navigation = styled.nav`
  background: rgba(0, 0, 0, 0.3);
  width: max-content;
  display: block;
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

  & > a {
    background: transparent;
    padding: 0.9rem;
    border-radius: 50%;
    display: flex;
    color: var(--color-light);
    font-size: 1.1rem;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
      color: var(--color-white);
    }

    &.active {
      background: var(--color-primary);
      color: var(--color-bg);
    }
  }
`;
