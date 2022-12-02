import { Link, graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

export default function Navbar() {
  const data = useStaticQuery(graphql`
    query SiteInfo {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const { title } = data.site.siteMetadata;

  return (
    <Nav id="myHeader">
      <ul>
        <a href="#about">
          <li>
            <p>1</p>
            <p>About</p>
          </li>
        </a>
        <a href="#skills">
          <li>
            <p>2</p>
            <p>Skills</p>
          </li>
        </a>
        <a href="#experience">
          <li>
            <p>3</p>
            <p>Experience</p>
          </li>
        </a>
        <a href="#portfolio">
          <li>
            <p>4</p>
            <p>portfolio</p>
          </li>
        </a>
      </ul>
    </Nav>
  );
}

const Nav = styled.div`
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  transition: var(--transition);
  background: rgba(56, 56, 56, 0.3);
  backdrop-filter: blur(15px);

  & > ul {
    display: flex;
    width: 100%;
    justify-content: flex-end;

    & > a {
      text-decoration: none;
    }

    & > a > li {
      cursor: pointer;
      height: 100%;
      background: linear-gradient(
        130deg,
        transparent,
        var(--color-primary),
        transparent
      );
      min-width: 11rem;
      transition: var(--transition);
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      & > :nth-child(2) {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
      }

      & > p {
        margin: 1.5rem;
        font-size: 3rem;
        text-transform: uppercase;
      }

      &:hover {
        min-width: 35rem;
        filter: saturate(20%);
      }

      @media (max-width: 1600px) {
        &:hover {
          min-width: 20rem;
          filter: saturate(20%);
        }
      }
    }
  }
`;
