import React from "react";
import styled from "styled-components";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import { Logo, Navbar, NavMobile, MobileHeader } from "@components";
import Intro from "./sections/Intro";

const Layout = ({ children }) => {
  const breakpoints = useBreakpoint();

  return (
    <div>
      {breakpoints.xl ? (
        <>
          <MobileHeader />
          <NavMobile />
        </>
      ) : (
        <Wrapper>
          {/* <Logo /> */}
          <Intro />
          <Navbar />
        </Wrapper>
      )}
      {children}
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  /* & > div:first-child {
    flex: 1;
    display: flex;
    justify-content: center;

    & > div {
      width: 120px;
    } 
  }*/
`;

export default Layout;
