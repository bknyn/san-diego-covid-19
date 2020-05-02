import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Bar, Line, Tooltip
} from 'recharts';
import { CalculateMovingAverage } from '../utils/maths';
import sassVars from '../styles/principles/_variables.scss';

const DailyDeltaChart = ({ segment, content }) => {
  const contentWithMovingAverages = content.map((node, index, array) => (
    {
      ...node,
      sevenDayMA: index >= 6 ? CalculateMovingAverage(array, index, 7) : null
    }
  ));

  const segmentColorVar = `${segment.camelCase}Color`;

  return (
    <div className="chart chart--combo">
      <h2 className="text-centered">Daily Change (& 7-day MA)</h2>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={contentWithMovingAverages}>
          <XAxis dataKey="dateReported" />
          <YAxis type="number" allowDataOverflow />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar
            dataKey="dailyDelta"
            name={segment.title}
            fill={sassVars[segmentColorVar]}
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
  );
};

DailyDeltaChart.propTypes = {
  segment: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    camelCase: PropTypes.string.isRequired
  }).isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      confirmedCases: PropTypes.string,
      dailyDelta: PropTypes.number,
      dataPoint: PropTypes.number,
      dateReported: PropTypes.string,
      deaths: PropTypes.string,
      growthRate: PropTypes.string,
      hospitalized: PropTypes.string,
      icu: PropTypes.string
    })
  ).isRequired
};

export default DailyDeltaChart;
