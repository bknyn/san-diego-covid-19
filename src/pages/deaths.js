import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Deaths" />

      <h1>Deaths</h1>
      <h2>deaths 2</h2>
      <h3>deaths 3</h3>
      <h4>deaths 4</h4>
      <h5>deaths 5</h5>
      <h6>deaths 6</h6>

    </Layout>
  )
}

export const query = graphql`
  {
    allGoogleSpreadsheetRawData {
      edges {
        node {
          dateReported
          deaths
        }
      }
    }
  }
`
