import { Logo } from "@components";
import React from "react";
import styled from "styled-components";

const MobileHeader = () => {
  return (
    <Container>
      <div>
        <Logo />

        <button>
          <a className="link">Resume</a>
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  width: 100%;
  backdrop-filter: blur(15px);
  background: rgba(0, 0, 0, 0.5);
  box-shadow: -1px 1px 14px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 1px 14px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 1px 14px 0px rgba(0, 0, 0, 0.75);

  & > div {
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > button {
      cursor: pointer;
      color: var(--color-lighter);
      background: transparent;
    }
  }
`;

export default MobileHeader;
