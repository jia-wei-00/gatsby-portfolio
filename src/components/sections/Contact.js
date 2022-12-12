import React from "react";
import styled from "styled-components";

const Contact = ({ children }) => {
  return (
    <div className="container">
      {children}
      <h2 className="numbered-heading">Contact</h2>

      <ContactContainer>
        <h2>Get In Touch</h2>
        <p>
          My inbox is always open. Whether you have a question or just want to
          say hi, I'll try my best to get back to you!
        </p>
        <a href="mailto:leongjw98@gmail.com">
          <button className="btn">Say Hi</button>
        </a>
      </ContactContainer>
    </div>
  );
};

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  row-gap: 20px;

  & > h2 {
    font-size: calc(2vw + 20px);
    color: var(--color-white);
  }

  & > p {
    max-width: 70%;
    color: var(--color-light);
  }
`;

export default Contact;
