import React from "react"
import { graphql } from "gatsby"
import { DataFormatter } from '../components/helpers'

import Layout from "../components/layout"
import SEO from "../components/seo"
import ChartBar from '../components/chartBar'
import ChartCombo from '../components/chartCombo'

export default ({ data }) => {
  const highestRawData = data.allGoogleSpreadsheetRawData.edges.reduce((max, node) => max.hospitalized > node.hospitalized ? max : node)
  const formattedData = DataFormatter(data.allGoogleSpreadsheetRawData.edges, 'hospitalized')

  return (
    <Layout>
      <SEO title="Hospitalized" />

      <h1 className="main-content__title main-content__layout--header">Hospitalized</h1>

      {console.log(formattedData)}
      <div className="main-content__layout--charts">
        <ChartBar
          chartTitle="Daily Total Reported"
          segment="hospitalized"
          content={formattedData}
          highValue={highestRawData.node.hospitalized}
        />

        <ChartCombo
          chartTitle="Daily Change with 5-day Moving Average"
          segment="hospitalized"
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
          hospitalized
        }
      }
    }
  }
`
