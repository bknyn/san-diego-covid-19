import React from 'react'
import { PercentDiff, StringFormatter } from './helpers'
import ChartBar from '../components/chartBar'
import ChartCombo from '../components/chartCombo'
import Scorecard from '../components/scorecard'

const StandardPage = ({title, dataEdges}) => {
  const slug = StringFormatter(title, 'slug')
  const camelCaseKey = StringFormatter(title, 'camelCase')

  const formattedData = dataEdges.map( ({node}, index, array) => {
    const totalToday = node[camelCaseKey]
    const totalYesterday = index > 0 ? array[index - 1].node[camelCaseKey] : null

    const delta = totalToday - totalYesterday
    const growthRate = PercentDiff(totalYesterday, totalToday)

    return {
      ...node,
      dataPoint: parseInt(node[camelCaseKey], 0),
      dailyDelta: delta,
      growthRate: growthRate === 'Infinity' ? null : growthRate
    }
  })

  const highestDataNode = formattedData.reduce((max, node) => max.dataPoint > node.dataPoint ? max : node)
  const lastThreeDays = formattedData.slice(formattedData.length - 3, formattedData.length)

  return (
    <div className="main__content standard-page">
      <div className="standard-page__charts">
        <ChartBar
          chartTitle="Daily Total Reported"
          segment={slug}
          content={formattedData}
          highValue={highestDataNode.dataPoint}
        />

        <ChartCombo
          chartTitle="Daily Change (TODO:: fix moving average)"
          segment={slug}
          content={formattedData}
        />
      </div>

      <div className="standard-page__scorecards">
        <h2 className="title--section">Today vs Yesterday</h2>

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

export default StandardPage
