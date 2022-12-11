import React from "react";
import styled from "styled-components";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import { Navbar, NavMobile, MobileHeader } from "@components";
import Intro from "./sections/Intro";

const Layout = ({ children, section }) => {
  const breakpoints = useBreakpoint();

  return (
    <Container>
      {breakpoints.xl ? (
        <>
          <MobileHeader />
          <NavMobile section={section} />
        </>
      ) : (
        <Wrapper>
          <Intro />
          <Navbar section={section} />
        </Wrapper>
      )}
      {children}
    </Container>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const Container = styled.div`
  padding-bottom: 100px;
`;

export default Layout;
