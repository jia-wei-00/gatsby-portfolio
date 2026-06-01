import styled from "styled-components";
import logoImage from "../images/logo.png";

const Logo = () => (
  <Container>
    <img src={logoImage} alt="logo" />
    <p>J</p>
  </Container>
);

const Container = styled.div`
  position: relative;
  width: 70px;

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  & img {
    animation: rotating 4s linear infinite;
    width: 70px;
    height: 70px;
    object-fit: contain;
  }

  & > p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Logo;
