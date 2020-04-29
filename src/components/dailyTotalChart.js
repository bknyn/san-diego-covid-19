import React from "react"
import PropTypes from 'prop-types'
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar, Tooltip } from 'recharts'
import sassVars from '../styles/principles/_variables.scss'

const DailyTotalChart = ({ segment, content }) => {
  return (
    <div className="chart chart--bar">
      <h2 className="text-centered">Daily Total Reported</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={content}>
          <XAxis dataKey="dateReported" />
          <YAxis type="number" allowDataOverflow={true} />
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Bar
            dataKey="dataPoint"
            name={segment.title}
            fill={sassVars[segment.camelCase + 'Color']}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

DailyTotalChart.propTypes = {
  segment: PropTypes.object,
  content: PropTypes.array
}

export default DailyTotalChart
