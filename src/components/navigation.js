import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import NavigationItem from './navigationItem.js'

const Navigation = () => {
  const data = useStaticQuery(graphql`
    query NavigationQuery {
      allGoogleSpreadsheetRawData {
        edges {
          node {
            confirmedCases
            deaths
            hospitalized
            icu
          }
        }
      }
    }
  `)

  const dataEdges = data.allGoogleSpreadsheetRawData.edges
  const latestNumbers = dataEdges.filter((elem, index, arr) => {
    return index == arr.length - 1 || index == arr.length - 2
  })

  const navArray = [
    {
      display: 'Confirmed Cases',
      count_yesterday: latestNumbers[0].node.confirmedCases,
      count_today: latestNumbers[1].node.confirmedCases
    },
    {
      display: 'Hospitalized',
      count_yesterday: latestNumbers[0].node.hospitalized,
      count_today: latestNumbers[1].node.hospitalized
    },
    {
      display: 'ICU',
      count_yesterday: latestNumbers[0].node.icu,
      count_today: latestNumbers[1].node.icu
    },
    {
      display: 'Deaths',
      count_yesterday: latestNumbers[0].node.deaths,
      count_today: latestNumbers[1].node.deaths
    }
  ]

  return (
    <nav className="nav">
      <div>
        {navArray.map( (navItemContent, index) => (
          <NavigationItem
            key={index}
            content={navItemContent}
          />
        ))}
      </div>
    </nav>
  )
}

export default Navigation
