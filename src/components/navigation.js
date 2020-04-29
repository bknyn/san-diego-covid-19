import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { PercentDiff, StringFormatter } from './helpers.js'

const Navigation = ({navOpen, setNavOpen}) => {
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

  const lastTwoDays = data.allGoogleSpreadsheetRawData.edges.slice(
                      data.allGoogleSpreadsheetRawData.edges.length - 2, data.allGoogleSpreadsheetRawData.edges.length)

  const navTitlesWithInlineData = ['Confirmed Cases', 'Hospitalized', 'ICU', 'Deaths']

  // Format array that will be looped to form the nav with quick insight data
  const navItemsWithInlineData = navTitlesWithInlineData.map( (title) => {
    const slug = StringFormatter(title, 'slug')
    const camelCaseKey = StringFormatter(title, 'camelCase')
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
      <button className="nav__mobile-toggle" onClick={() => setNavOpen(!navOpen)}>
        <span>&nbsp;</span>
      </button>
      <div className="nav__items">
        <Link to='/' className="nav__item">Overview</Link>
        {navItemsWithInlineData.map( (navItemData, index) => (
          <Link
            key={index}
            to={`/${navItemData.slug}/`}
            className={`nav__item ${'nav__item--' + navItemData.slug}`}
          >
            {navItemData.display}
            <div className="nav__item__number-container">
              <span className="nav__item__daily-count">
                {/* Add commas to number string */}
                {navItemData.totalToday.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </span>
              <span className="nav__item__daily-growth-rate" >
                {`${navItemData.growthRateToday >= 0 ? '+' : '-'} ${navItemData.growthRateToday}%`}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
