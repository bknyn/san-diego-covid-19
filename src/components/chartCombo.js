import React from "react"
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Bar, Line, Tooltip } from 'recharts'

const ChartBar = ({ chartTitle, segment, content }) => (
  <div className={`chart chart--combo chart--${segment}`}>
    <h2 className="chart__title">{chartTitle}</h2>
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={content}>
        <XAxis dataKey="dateReported" />
        <YAxis type="number" allowDataOverflow={true} />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Bar dataKey="dailyDelta" />
        <Line type="monotone" dataKey="movingAverage" stroke="#333" />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
)

export default ChartBar
