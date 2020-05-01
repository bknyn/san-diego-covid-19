import React from 'react'

const Scorecard = ({ title, bigNumber, subtextValue, subtextFormatter, subtextComparison = false }) => {
  const subtext = subtextValue != null ? subtextValue : null
  const subtextString = subtextFormatter != null ? subtextFormatter(subtext) : subtext
  const subtextComparisonClass = (
    subtextComparison ? (subtextValue >= 0 ? 'text--direction-bad' : 'text--direction-good') : ''
  )

  return (
    <div className="scorecard">
      <h3 className="scorecard__title">{title}</h3>
      <span className="scorecard__big-number">{bigNumber}</span>
      {subtextString != null &&
        <span className={`scorecard__subtext ${subtextComparisonClass}`}>
          {subtextString}
        </span>
      }
    </div>
  )
}

export default Scorecard
