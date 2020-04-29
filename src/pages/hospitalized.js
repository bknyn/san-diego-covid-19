import React from 'react'
import { graphql } from 'gatsby'
import { StringFormatter } from '../utils/strings'

import Layout from '../components/layout'
import StandardPage from '../components/standardPage'
import SEO from '../components/seo'

export default ({ data }) => {
  const segment = {
    title: 'Hospitalized',
    get slug() { return StringFormatter(this.title, 'slug') },
    get camelCaseKey() { return StringFormatter(this.title, 'camelCase') }
  }

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
          hospitalized
        }
      }
    }
  }
`
