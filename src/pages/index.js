import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({ data }) => {

  return (
    <Layout>
      <SEO title="Confirmed Cases" />

      <h1 className="title--main main-content__layout--header">Confirmed Cases</h1>

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
