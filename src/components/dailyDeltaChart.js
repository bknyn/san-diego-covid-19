import React from "react"
import { CalculateMovingAverage } from './helpers'
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Bar, Line, Tooltip } from 'recharts'
import sassVars from '../styles/principles/_variables.scss'

const DailyDeltaChart = ({ segment, content }) => {
  const contentWithMovingAverages = content.map( (node, index, array) => {
    return {
      ...node,
      sevenDayMA: index >= 6 ? CalculateMovingAverage(array, index, 7) : null
    }
  })

  return (
    <div className="chart chart--combo">
      <h2 className="text-centered">Daily Change (& 7-day MA)</h2>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={contentWithMovingAverages}>
          <XAxis dataKey="dateReported" />
          <YAxis type="number" allowDataOverflow={true} />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar
            dataKey="dailyDelta"
            name={segment.title}
            fill={sassVars[segment.camelCaseKey + 'Color']}
          />
          <Line
            type="monotone"
            dataKey="sevenDayMA"
            name="7-day Moving Average"
            stroke="#333"
            strokeWidth="2"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DailyDeltaChart
