import React from 'react'
import PropTypes from 'prop-types'
import { PercentDiff } from './helpers'
import DailyTotalChart from './dailyTotalChart'
import DailyDeltaChart from './dailyDeltaChart'
import Scorecard from './scorecard'

const StandardPage = ({segment, dataEdges}) => {
  const formattedData = dataEdges.map( ({node}, index, array) => {
    const totalToday = node[segment.camelCaseKey]
    const totalYesterday = index > 0 ? array[index - 1].node[segment.camelCaseKey] : null

    const delta = totalToday - totalYesterday
    const growthRate = PercentDiff(totalYesterday, totalToday)

    return {
      ...node,
      dataPoint: parseInt(node[segment.camelCaseKey], 0),
      dailyDelta: delta,
      growthRate: growthRate === 'Infinity' ? null : growthRate
    }
  })

  const lastThreeDays = formattedData.slice(formattedData.length - 3, formattedData.length)

  return (
    <div className="main__content standard-page">
      <div className="standard-page__charts">
        <DailyTotalChart
          segment={segment}
          content={formattedData}
        />

        <DailyDeltaChart
          segment={segment}
          content={formattedData}
        />
      </div>

      <div className="standard-page__scorecards">
        <h2 className="text-centered">Today vs Yesterday</h2>

        <Scorecard
          title="Total Cases"
          bigNumber={lastThreeDays[2].dataPoint}
          comparison={lastThreeDays[2].dailyDelta}
        />

        <Scorecard
          title="Growth Rate"
          bigNumber={`${PercentDiff(lastThreeDays[1].dataPoint, lastThreeDays[2].dataPoint)}%`}
          comparison={
            `${(PercentDiff(lastThreeDays[1].dataPoint, lastThreeDays[2].dataPoint) - PercentDiff(lastThreeDays[0].dataPoint, lastThreeDays[1].dataPoint)).toFixed(2)}%`
          }
        />
      </div>
    </div>
  )
}

StandardPage.propTypes = {
  segment: PropTypes.object,
  dataEdges: PropTypes.array
}

export default StandardPage
