import React from "react"
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar, Tooltip } from 'recharts'

const ChartBar = ({ chartTitle, segment, content, highValue }) => (
  <div className={`chart chart--bar chart--${segment}`}>
    <h2 className="title--section">{chartTitle}</h2>
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={content}>
        <XAxis dataKey="dateReported" />
        <YAxis domain={[0, dataMax => highValue]} type="number" allowDataOverflow={true} />
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Bar dataKey="dataPoint" />
      </BarChart>
    </ResponsiveContainer>
  </div>
)

export default ChartBar
