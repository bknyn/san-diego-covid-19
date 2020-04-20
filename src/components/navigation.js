import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import { PercentDiff } from './helpers.js'
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
      dailyGrowthRate: PercentDiff(latestNumbers[0].node.confirmedCases, latestNumbers[1].node.confirmedCases),
      countToday: latestNumbers[1].node.confirmedCases
    },
    {
      display: 'Hospitalized',
      dailyGrowthRate: PercentDiff(latestNumbers[0].node.hospitalized, latestNumbers[1].node.hospitalized),
      countToday: latestNumbers[1].node.hospitalized
    },
    {
      display: 'ICU',
      dailyGrowthRate: PercentDiff(latestNumbers[0].node.icu, latestNumbers[1].node.icu),
      countToday: latestNumbers[1].node.icu
    },
    {
      display: 'Deaths',
      dailyGrowthRate: PercentDiff(latestNumbers[0].node.deaths, latestNumbers[1].node.deaths),
      countToday: latestNumbers[1].node.deaths
    }
  ]

  return (
    <nav className="nav">
      <Link to="/" className="nav__item">Overview</Link>
      {navArray.map( (navItemContent, index) => (
        <NavigationItem
          key={index}
          content={navItemContent}
        />
      ))}
    </nav>
  )
}

export default Navigation
