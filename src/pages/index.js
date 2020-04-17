import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import { graphql } from "gatsby"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />

      {data.allGoogleSpreadsheetRawData.nodes.map( ({ confirmedCases }, index) => (
        <p key={index}>
          { confirmedCases }
        </p>
      ))}

      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export const query = graphql`
  {
    allGoogleSpreadsheetRawData {
      nodes {
        dateReported
        confirmedCases
      }
    }
  }
`