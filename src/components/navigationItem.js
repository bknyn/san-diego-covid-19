import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { PercentDiff } from './helpers.js'

const NavigationItem = ({content}) => (
  <div>
    <Link to={content.display.toLowerCase().replace(/\s+/g, '-')}>
      {content.display}
      {/* {PercentDiff(content.count_yesterday, content.count_today)} */}
    </Link>
    
  </div>
)

export default NavigationItem
