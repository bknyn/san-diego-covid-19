import React from 'react'
import { graphql } from 'gatsby'
import sassVars from '../styles/principles/_variables.scss'

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

  return (
    <Layout>
      <SEO title="Confirmed Cases" />
      <h1 className="main__header">Overview</h1>
      <div className="main__content">
        <div className="chart chart--bar">
          <h2 className="text-centered">Overall Rates (compared to confirmed cases)</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={pageData}>
              <CartesianGrid />
              <XAxis dataKey="dateReported" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hospitalizedRate" name="Hospitalized" fill={sassVars.hospitalizedColor} />
              <Bar dataKey="icuRate" name="ICU" fill={sassVars.icuColor} />
              <Bar dataKey="deathRate" name="Deaths" fill={sassVars.deathsColor} />
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
