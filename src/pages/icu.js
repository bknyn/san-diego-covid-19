import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import StandardPage from '../components/standardPage'
import SEO from '../components/seo'

export default ({ data }) => {
  const title = 'ICU'

  return (
    <Layout>
      <SEO title={title} />

      <StandardPage
        title={title}
        dataEdges={data.allGoogleSpreadsheetRawData.edges}
      />
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
