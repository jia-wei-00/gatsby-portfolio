import type { ReactNode } from "react";
import styled from "styled-components";
import { useBreakpoint } from "../hooks/useBreakpoint";
import Navbar from "./Navbar";
import NavMobile from "./NavMobile";
import MobileHeader from "./MobileHeader";
import Intro from "./sections/Intro";

const Layout = ({ children }: { children: ReactNode }) => {
  const breakpoints = useBreakpoint();

  return (
    <Container>
      {breakpoints.xl ? (
        <>
          <MobileHeader />
          <NavMobile />
        </>
      ) : (
        <Wrapper>
          <Intro />
          <Navbar />
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
