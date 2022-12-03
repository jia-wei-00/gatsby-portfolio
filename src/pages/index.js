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
      <Container>
        <div className="container">
          <p>Hi, my name is</p>
          <h1>{title}</h1>
          <h2>{sign}</h2>
          <h4>{description}</h4>
        </div>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  height: 100vh;
  align-items: center;
  text-align: right;
  width: 100%;
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
