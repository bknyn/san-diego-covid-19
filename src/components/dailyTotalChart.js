import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar, Tooltip
} from 'recharts';
import sassVars from '../styles/principles/_variables.scss';

const DailyTotalChart = ({ segment, content }) => {
  const segmentColorVar = `${segment.camelCase}Color`;

  return (
    <div className="chart chart--bar">
      <h2 className="text-centered">Daily Total Reported</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={content}>
          <XAxis dataKey="dateReported" />
          <YAxis type="number" allowDataOverflow />
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Bar
            dataKey="dataPoint"
            name={segment.title}
            fill={sassVars[segmentColorVar]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

DailyTotalChart.propTypes = {
  segment: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    camelCase: PropTypes.string.isRequired,
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
      icu: PropTypes.string,
    })
  ).isRequired,
};

export default DailyTotalChart;
