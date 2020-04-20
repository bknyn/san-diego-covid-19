import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { PercentDiff } from './helpers.js'

const NavigationItem = ({content}) => (
  <Link to={`/${content.display.toLowerCase().replace(/\s+/g, '-')}`} className="nav__item">
    {content.display}
    <div className="nav__item__number-container">
      <span className="nav__item__daily-count">
        {content.countToday.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </span>
      <span className={`nav__item__daily-growth-rate ${content.dailyGrowthRate > 0 ? 'text--bad-direction' : 'text--good-direction'}`} >
        {`${content.dailyGrowthRate > 0 ? '+' : '-'} ${content.dailyGrowthRate} %`}
      </span>
    </div>
  </Link>
)

export default NavigationItem
