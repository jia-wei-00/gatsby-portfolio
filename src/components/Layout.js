import React from "react";
import Navbar from "./Nav";
import NavMobile from "./NavMobile";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import MobileHeader from "./MobileHeader";

const Layout = ({ children }) => {
  const breakpoints = useBreakpoint();

  return (
    <div>
      {breakpoints.md ? (
        <>
          <MobileHeader />
          <NavMobile />
        </>
      ) : (
        <Navbar />
      )}
      {children}
    </div>
  );
};

export default Layout;
