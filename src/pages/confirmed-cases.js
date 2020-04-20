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

      <h1 className="title--main main-content__layout--header">Confirmed Cases</h1>

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

      <div className="main-content__layout--scorecards">
        <h2 className="title--section">Today vs Yesterday</h2>
        <div className="scorecard">
          <h3 className="scorecard__title">Total Cases</h3>
          <span className="scorecard__big-number">2268</span>
          <span className="scorecard__comparison">55</span>
        </div>
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
