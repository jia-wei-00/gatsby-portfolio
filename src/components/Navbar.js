import { Link } from "gatsby";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { Logo } from "@components";

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

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
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return scrollDirection;
}

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    const header = document.getElementById("myHeader");
    if (header) {
      const sticky = header.offsetHeight - 50;
      const scrollCallBack = window.addEventListener("scroll", () => {
        if (window.pageYOffset > sticky) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      });
      return () => {
        window.removeEventListener("scroll", scrollCallBack);
      };
    }
  }, [sticky]);

  return (
    <>
      {!sticky ? (
        <Fade top>
          <Nav id="myHeader">
            <ul>
              <Link to="/#about" className="link">
                <li>
                  <p>1</p>
                  <p>About</p>
                </li>
              </Link>
              <Link to="/#work" className="link">
                <li>
                  <p>2</p>
                  <p>Work</p>
                </li>
              </Link>
              <Link to="/#project" className="link">
                <li>
                  <p>3</p>
                  <p>Projects</p>
                </li>
              </Link>
              <Link to="/#contact" className="link">
                <li>
                  <p>4</p>
                  <p>Contact</p>
                </li>
              </Link>
            </ul>
          </Nav>
        </Fade>
      ) : null}

      {sticky ? (
        <StickyNav scroll={scrollDirection}>
          <Logo />
          <Link to="/#about" className="link">
            <span>1</span>
            <Fade right>
              <span>About</span>
            </Fade>
          </Link>
          <Link to="/#work" className="link">
            <span>2</span>
            <Fade right>
              <span>Work</span>
            </Fade>
          </Link>
          <Link to="/#project" className="link">
            <span>3</span>
            <Fade right>
              <span>Projects</span>
            </Fade>
          </Link>
          <Link to="/#contact" className="link">
            <span>4</span>
            <Fade right>
              <span>Contact</span>
            </Fade>
          </Link>
        </StickyNav>
      ) : null}
    </>
  );
};

const Nav = styled.div`
  display: flex;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  transition: var(--transition);
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
        min-width: 38rem;
        filter: saturate(20%);
      }

      @media (max-width: 1700px) {
        &:hover {
          min-width: 20rem;
          filter: saturate(20%);
        }
      }
    }
  }
`;

const StickyNav = styled.div`
  display: flex;
  justify-content: right;
  z-index: 10;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  top: 0;
  right: 0;
  left: 0;
  transition: var(--transition);
  transform: ${(props) =>
    props.scroll === "down" ? `translateY(-100%)` : null};

  & > div:first-child {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  & > a {
    position: relative;
    min-width: 11rem;
    text-align: left;
    padding: 20px;
    background: linear-gradient(
      130deg,
      transparent,
      var(--color-primary),
      transparent
    );
    border-bottom-left-radius: 10px;

    & > span:first-child {
      font-size: 2.5rem;
      color: rgba(225, 225, 225, 0.4);
    }

    & > span:nth-child(2) {
      position: absolute;
      left: 25px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1rem;
      color: var(--color-lighter);
    }
  }
`;

export default Navbar;
