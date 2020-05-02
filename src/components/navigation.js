import React from 'react';
import PropTypes from 'prop-types';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { PercentDiff } from '../utils/maths';
import SegmentFormatter from '../utils/general';
import { AddCommasToNumberString, AddPrefixOperator } from '../utils/decorators';

const Navigation = ({ navOpen, setNavOpen }) => {
  const data = useStaticQuery(graphql`
    query NavigationQuery {
      allGoogleSpreadsheetRawData {
        edges {
          node {
            confirmedCases
            deaths
            hospitalized
            icu
          }
        }
      }
    }
  `);

  const dynamicNavTitles = ['Confirmed Cases', 'Hospitalized', 'ICU', 'Deaths'];
  const dataEdges = data.allGoogleSpreadsheetRawData.edges;

  // Format array that will be looped to form the nav with quick insight data
  const dynamicNavItems = dynamicNavTitles.map((title) => {
    const segment = SegmentFormatter(title);
    const totalToday = dataEdges[dataEdges.length - 1].node[segment.camelCase];
    const totalYesterday = dataEdges[dataEdges.length - 2].node[segment.camelCase];

    return {
      display: segment.title,
      slug: segment.slug,
      growthRateToday: PercentDiff(totalYesterday, totalToday),
      totalToday
    };
  });

  return (
    <nav className="nav">
      {/* Hamburger button */}
      <button
        className="nav__mobile-toggle"
        type="button"
        onClick={() => setNavOpen(!navOpen)}
      >
        <span>&nbsp;</span>
      </button>

      <div className="nav__items">
        <Link to="/" className="nav__item">
          Overview
        </Link>
        {dynamicNavItems.map((navItemData) => (
          <Link
            key={navItemData.slug}
            to={`/${navItemData.slug}/`}
            className={`nav__item nav__item--${navItemData.slug}`}
          >
            {navItemData.display}
            <div className="nav__item__number-container">
              <span className="nav__item__daily-count">
                {AddCommasToNumberString(navItemData.totalToday)}
              </span>
              <span className="nav__item__daily-growth-rate">
                {`${AddPrefixOperator(navItemData.growthRateToday)}%`}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  navOpen: PropTypes.bool.isRequired,
  setNavOpen: PropTypes.func.isRequired
};

export default Navigation;
