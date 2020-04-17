import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />

      <table>
        <thead>
          <tr>
            <th>Date Reported</th>
            <th>Confirmed cases</th>
            <th>Hospitalized</th>
            <th>ICU</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>
          {data.allGoogleSpreadsheetRawData.edges.map( ({ node }, index) => (
            <tr key={index}>
              <td>{node.dateReported}</td>
              <td>{node.confirmedCases}</td>
              <td>{node.hospitalized}</td>
              <td>{node.icu}</td>
              <td>{node.deaths}</td>
            </tr>
          ))}
        </tbody>
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