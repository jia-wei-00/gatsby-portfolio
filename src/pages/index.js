import * as React from "react";
import Layout from "../components/Layout";
import "../styles/global.css";
import styled from "styled-components";
import { graphql } from "gatsby";

export default function Home({ data }) {
  console.log(data.site);
  const { title, description, contact, sign } = data.site.siteMetadata;

  return (
    <Layout>
      <Container className="container">
        <div>
          <p>Hi, my name is</p>
          <h1>{title}</h1>
          <h1>{sign}</h1>
          <h3>{description}</h3>
        </div>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: right;
  width: 100%;

  & > div {
    width: 100%;
  }
`;

export const query = graphql`
  query MyQuery {
    site {
      siteMetadata {
        contact
        description
        title
        sign
      }
    }
  }
`;
