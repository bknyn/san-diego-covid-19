import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({ data }) => {
  const pageData = data.allGoogleSpreadsheetRawData.edges.map(({node}) => {
    return {
      ...node,
      hospitalizedRate: ((node.hospitalized / node.confirmedCases) * 100).toFixed(2),
      icuRate: ((node.icu / node.confirmedCases) * 100).toFixed(2),
      deathRate: ((node.deaths / node.confirmedCases) * 100).toFixed(2)
    }
  })

  console.log(pageData)

  return (
    <Layout>
      <SEO title="Confirmed Cases" />
      <h1 className="title--main main-content__layout--header">Overview</h1>
    </Layout>
  )
}

export const query = graphql`
  {
    allGoogleSpreadsheetRawData {
      edges {
        node {
          confirmedCases
          dateReported(formatString: "MMMM DD, YYYY")
          deaths
          hospitalized
          icu
        }
      }
    }
  }
`
