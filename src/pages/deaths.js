import React from 'react'
import { graphql } from 'gatsby'
import { SegmentFormatter } from '../utils/general'

import Layout from '../components/layout'
import StandardPage from '../components/standardPage'
import SEO from '../components/seo'

export default ({ data }) => {
  const segment = SegmentFormatter('Deaths')

  return (
    <Layout>
      <SEO title={segment.title} />
      <h1 className="main__header">{segment.title}</h1>

      <StandardPage
        segment={segment}
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
          deaths
        }
      }
    }
  }
`
