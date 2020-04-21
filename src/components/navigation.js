import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { PercentDiff } from './helpers.js'

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
  const lastTwoDays = dataEdges.slice(dataEdges.length - 2, dataEdges.length)
  const navTitlesWithInlineData = ['Confirmed Cases', 'Hospitalized', 'ICU', 'Deaths']

  // Format array that will be looped to form the nav with quick insight data
  const navItemsWithInlineData = navTitlesWithInlineData.map( (title) => {
    const slug = title.toLowerCase().replace(/\s+/g, '-') // lower case and replace spaces with hyphens
    const camelCaseKey = slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase() ) // used in graphql lookup
    const totalToday = lastTwoDays[1].node[camelCaseKey]
    const totalYesterday = lastTwoDays[0].node[camelCaseKey]

    return {
      display: title,
      slug: slug,
      growthRateToday: PercentDiff(totalYesterday, totalToday),
      totalToday: totalToday
    }
  })

  return (
    <nav className="nav">
      {navItemsWithInlineData.map( (navItemData, index) => (
        <Link
          key={index}
          to={`/${navItemData.slug}`}
          className="nav__item"
        >
          {navItemData.display}
          <div className="nav__item__number-container">
            <span className="nav__item__daily-count">
              {/* Add commas to number string */}
              {navItemData.totalToday.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </span>
            <span className={`nav__item__daily-growth-rate ${navItemData.growthRateToday > 0 ? 'text--bad-direction' : 'text--good-direction'}`} >
              {`${navItemData.growthRateToday >= 0 ? '+' : '-'} ${navItemData.growthRateToday}%`}
            </span>
          </div>
        </Link>
      ))}
    </nav>
  )
}

export default Navigation
