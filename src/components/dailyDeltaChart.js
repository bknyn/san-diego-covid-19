import React from "react"
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Bar, Line, Tooltip } from 'recharts'
import sassVars from '../styles/principles/_variables.scss'

const DailyDeltaChart = ({ segment, content }) => {
  return (
    <div className="chart chart--combo">
      <h2 className="text-centered">Daily Change</h2>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={content}>
          <XAxis dataKey="dateReported" />
          <YAxis type="number" allowDataOverflow={true} />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar
            dataKey="dailyDelta"
            name={segment.title}
            fill={sassVars[segment.camelCaseKey + 'Color']}
          />
          <Line type="monotone" dataKey="movingAverage" stroke="#333" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DailyDeltaChart
