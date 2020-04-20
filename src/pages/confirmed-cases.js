import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Confirmed Cases" />

      <table>
        <tr><td>page2</td></tr>
      </table>

    </Layout>
  )
}

export const query = graphql`
  {
    allGoogleSpreadsheetRawData {
      edges {
        node {
          dateReported
          confirmedCases
          deaths
          hospitalized
          icu
        }
      }
    }
  }
`
