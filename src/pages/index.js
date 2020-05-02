import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import {
  ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar
} from 'recharts';

import Layout from '../components/layout';
import SEO from '../components/seo';
import sassVars from '../styles/principles/_variables.scss';

const Index = ({ data: { allGoogleSpreadsheetRawData: { edges } } }) => {
  const pageData = edges.map(({ node }) => (
    {
      ...node,
      hospitalizedRate: ((node.hospitalized / node.confirmedCases) * 100).toFixed(2),
      icuRate: ((node.icu / node.confirmedCases) * 100).toFixed(2),
      deathRate: ((node.deaths / node.confirmedCases) * 100).toFixed(2)
    }
  ));

  return (
    <Layout>
      <SEO title="Overview" />
      <h1 className="main__header">Overview</h1>
      <div className="main__content">
        <div className="chart chart--bar">
          <h2 className="text-centered">Overall Rates (compared to confirmed cases)</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={pageData}>
              <CartesianGrid />
              <XAxis dataKey="dateReported" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="hospitalizedRate"
                name="Hospitalized"
                fill={sassVars.hospitalizedColor}
              />
              <Bar
                dataKey="icuRate"
                name="ICU"
                fill={sassVars.icuColor}
              />
              <Bar
                dataKey="deathRate"
                name="Deaths"
                fill={sassVars.deathsColor}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </Layout>
  );
};

export const query = graphql`
  {
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

Index.propTypes = {
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

export default Index;
