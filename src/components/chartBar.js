import React from "react"
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar, Tooltip } from 'recharts'
import sassVars from '../styles/principles/_variables.scss'

const ChartBar = ({ chartTitle, segment, content }) => (
  <div className="chart chart--bar">
    <h2 className="text-centered">{chartTitle}</h2>
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={content}>
        <XAxis dataKey="dateReported" />
        <YAxis type="number" allowDataOverflow={true} />
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Bar dataKey="dataPoint" fill={sassVars[segment + 'Color']} />
      </BarChart>
    </ResponsiveContainer>
  </div>
)

export default ChartBar
