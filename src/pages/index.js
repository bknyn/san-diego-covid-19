import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts'

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
      <h1 className="main__header">Overview</h1>

      <div className="main__content">
        <div className="chart chart--bar">
          <h2 className="title--section">Overall Rates (Confirmed cases / hospitalized|icu|deaths)</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={pageData}>
              <CartesianGrid />
              <XAxis dataKey="dateReported" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hospitalizedRate" className="chart--hospitalized" />
              <Bar dataKey="icuRate" className="chart--icu" />
              <Bar dataKey="deathRate" className="chart--deaths" />
            </BarChart>
          </ResponsiveContainer>
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
