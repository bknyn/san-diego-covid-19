import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { PercentDiff } from '../utils/maths';
import { AddCommasToNumberString, AddPrefixOperator } from '../utils/decorators';

import Layout from '../components/layout';
import SEO from '../components/seo';
import DailyTotalChart from '../components/dailyTotalChart';
import DailyDeltaChart from '../components/dailyDeltaChart';
import Scorecard from '../components/scorecard';

const SegmentTemplate = ({
  pageContext: { segment },
  data: { allGoogleSpreadsheetRawData: { edges } }
}) => {
  const formattedData = edges.map(({ node }, index, array) => {
    const totalToday = node[segment.camelCase];
    const totalYesterday = index > 0 ? array[index - 1].node[segment.camelCase] : null;

    const delta = totalToday - totalYesterday;
    const growthRate = PercentDiff(totalYesterday, totalToday);

    return {
      ...node,
      dataPoint: parseInt(node[segment.camelCase], 0),
      dailyDelta: delta,
      growthRate: growthRate === 'Infinity' ? null : growthRate
    };
  });

  const today = formattedData[formattedData.length - 1];
  const yesterday = formattedData[formattedData.length - 2];
  const highestDailyChange = formattedData.reduce((max, node) => (
    max.dailyDelta > node.dailyDelta ? max : node
  ));
  const highestGrowthRate = formattedData.reduce((max, node) => (
    max.growthRate > node.growthRate ? max : node
  ));

  return (
    <Layout>
      <SEO title={segment.title} />
      <h1 className="main__header">{segment.title}</h1>

      <div className="main__content inner-grid">
        <div>
          <DailyTotalChart
            segment={segment}
            content={formattedData}
          />

          <DailyDeltaChart
            segment={segment}
            content={formattedData}
          />
        </div>

        <div>
          <h2 className="text-centered">Today</h2>
          <Scorecard
            title="Total Cases"
            bigNumber={AddCommasToNumberString(today.dataPoint.toString())}
            subtextValue={today.dailyDelta}
            subtextFormatter={(value) => `${AddPrefixOperator(value)} vs yesterday`}
            subtextComparison
          />

          <Scorecard
            title="Growth Rate"
            bigNumber={`${PercentDiff(yesterday.dataPoint, today.dataPoint)}%`}
            subtextValue={(today.growthRate - yesterday.growthRate).toFixed(2)}
            subtextFormatter={(value) => `${AddPrefixOperator(value)}% vs yesterday`}
            subtextComparison
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
    </Layout>
  );
};

export const query = graphql`
  query {
    allGoogleSpreadsheetRawData {
      edges {
        node {
          confirmedCases
          dateReported(formatString: "MMMM DD, YYYY")
          deaths
          hospitalized
          icu
        }
      }
    }
  }
`;

SegmentTemplate.propTypes = {
  pageContext: PropTypes.shape({
    segment: PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      camelCase: PropTypes.string.isRequired
    })
  }).isRequired,
  data: PropTypes.shape({
    allGoogleSpreadsheetRawData: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            confirmedCases: PropTypes.string.isRequired,
            dateReported: PropTypes.string.isRequired,
            deaths: PropTypes.string.isRequired,
            hospitalized: PropTypes.string.isRequired,
            icu: PropTypes.string.isRequired
          })
        })
      )
    })
  }).isRequired
};

export default SegmentTemplate;
