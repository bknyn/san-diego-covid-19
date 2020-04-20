import React from "react"
import { graphql } from "gatsby"
import { DataFormatter } from '../components/helpers'

import Layout from "../components/layout"
import SEO from "../components/seo"
import ChartBar from '../components/chartBar'
import ChartCombo from '../components/chartCombo'

export default ({ data }) => {
  const highestRawData = data.allGoogleSpreadsheetRawData.edges.reduce((max, node) => max.confirmedCases > node.confirmedCases ? max : node)
  const formattedData = DataFormatter(data.allGoogleSpreadsheetRawData.edges, 'confirmedCases')

  return (
    <Layout>
      <SEO title="Confirmed Cases" />

      <h1 className="main-content__title main-content__layout--header">Confirmed Cases</h1>

      <div className="main-content__layout--charts">
        <ChartBar
          chartTitle="Daily Total Reported"
          segment="confirmed-cases"
          content={formattedData}
          highValue={highestRawData.node.confirmedCases}
        />

        <ChartCombo
          chartTitle="Daily Change with 5-day Moving Average"
          segment="confirmed-cases"
          content={formattedData}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allGoogleSpreadsheetRawData {
      edges {
        node {
          dateReported(formatString: "MMMM DD, YYYY")
          confirmedCases
        }
      }
    }
  }
`
