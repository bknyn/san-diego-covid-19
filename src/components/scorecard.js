import React from "react"

const Scorecard = ({ title, bigNumber, comparison }) => (
  <div className="scorecard">
    <h3 className="scorecard__title">{title}</h3>
    <span className="scorecard__big-number">{bigNumber}</span>
    <span className={`scorecard__comparison ${comparison > 0 ? 'text--bad-direction' : 'text--good-direction' }`}>{`${comparison >= 0 ? '+' : '' } ${comparison}`}</span>
  </div>
)

export default Scorecard
