import React from "react";
import Navbar from "./Nav";
import NavMobile from "./NavMobile";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

const Layout = ({ children }) => {
  const breakpoints = useBreakpoint();

  return (
    <div>
      {breakpoints.md ? <NavMobile /> : <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
