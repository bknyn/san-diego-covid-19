import React from "react"
import { graphql } from "gatsby"
import { PercentDiff, DataFormatter } from '../components/helpers'

import Layout from "../components/layout"
import SEO from "../components/seo"
import ChartBar from '../components/chartBar'
import ChartCombo from '../components/chartCombo'
import Scorecard from "../components/scorecard"

export default ({ data }) => {
  const highestRawData = data.allGoogleSpreadsheetRawData.edges.reduce((max, node) => max.icu > node.icu ? max : node)
  const formattedData = DataFormatter(data.allGoogleSpreadsheetRawData.edges, 'icu')
  const lastThreeDays = formattedData.slice(formattedData.length - 3, formattedData.length)

  return (
    <Layout>
      <SEO title="ICU" />

      <h1 className="title--main main-content__layout--header">ICU</h1>

      <div className="main-content__layout--charts">
        <ChartBar
          chartTitle="Daily Total Reported"
          segment="icu"
          content={formattedData}
          highValue={highestRawData.node.icu}
        />

        <ChartCombo
          chartTitle="Daily Change with 5-day Moving Average"
          segment="icu"
          content={formattedData}
        />
      </div>

      <div className="main-content__layout--scorecards">
        <h2 className="title--section">Today vs Yesterday</h2>
        <Scorecard
          title="Total Cases"
          bigNumber={lastThreeDays[2].rawDataPoint}
          comparison={lastThreeDays[2].dailyDelta}
        />

        <Scorecard
          title="Growth Rate"
          bigNumber={`${PercentDiff(lastThreeDays[1].rawDataPoint, lastThreeDays[2].rawDataPoint)}%`}
          comparison={
            `${(PercentDiff(lastThreeDays[1].rawDataPoint, lastThreeDays[2].rawDataPoint) - PercentDiff(lastThreeDays[0].rawDataPoint, lastThreeDays[1].rawDataPoint)).toFixed(2)}%`
          }
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
          icu
        }
      }
    }
  }
`
