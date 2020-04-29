import React from 'react'
import PropTypes from 'prop-types'
import { AddCommasToNumberString, AddPrefixOperator } from '../utils/decorators'
import { PercentDiff } from '../utils/maths'
import DailyTotalChart from './dailyTotalChart'
import DailyDeltaChart from './dailyDeltaChart'
import Scorecard from './scorecard'

const StandardPage = ({segment, dataEdges}) => {
  const formattedData = dataEdges.map( ({node}, index, array) => {
    const totalToday = node[segment.camelCase]
    const totalYesterday = index > 0 ? array[index - 1].node[segment.camelCase] : null

    const delta = totalToday - totalYesterday
    const growthRate = PercentDiff(totalYesterday, totalToday)

    return {
      ...node,
      dataPoint: parseInt(node[segment.camelCase], 0),
      dailyDelta: delta,
      growthRate: growthRate === 'Infinity' ? null : growthRate
    }
  })

  const today = formattedData[formattedData.length - 1]
  const yesterday = formattedData[formattedData.length - 2]
  const highestDailyChange = formattedData.reduce((max, node) => max.dailyDelta > node.dailyDelta ? max : node)
  const highestGrowthRate = formattedData.reduce((max, node) => max.growthRate > node.growthRate ? max : node)

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
        <h2 className="text-centered">Today</h2>

        <Scorecard
          title="Total Cases"
          bigNumber={AddCommasToNumberString(today.dataPoint.toString())}
          subtextValue={today.dailyDelta}
          subtextFormatter={(value) => `${AddPrefixOperator(value)} vs yesterday`}
          subtextComparison={true}
        />

        <Scorecard
          title="Growth Rate"
          bigNumber={`${PercentDiff(yesterday.dataPoint, today.dataPoint)}%`}
          subtextValue={(today.growthRate - yesterday.growthRate).toFixed(2)}
          subtextFormatter={(value) => `${AddPrefixOperator(value)}% vs yesterday`}
          subtextComparison={true}
        />

        <h2 className="text-centered">Highs</h2>
        <Scorecard
          title="Highest Daily Change"
          bigNumber={`${AddCommasToNumberString(highestDailyChange.dailyDelta.toString())}`}
          subtextValue={highestDailyChange.dateReported}
          subtextFormatter={(value) => `on ${value}`}
        />

        <Scorecard
          title="Highest Growth Rate"
          bigNumber={`${highestGrowthRate.growthRate}%`}
          subtextValue={highestGrowthRate.dateReported}
          subtextFormatter={(value) => `on ${value}`}
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
