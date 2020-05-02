import React from 'react';
import PropTypes from 'prop-types';

const Scorecard = ({
  title, bigNumber, subtextValue, subtextFormatter, subtextComparison = false
}) => {
  const subtext = subtextValue != null ? subtextValue : null;
  const subtextString = subtextFormatter != null ? subtextFormatter(subtext) : subtext;

  let subtextComparisonClass = '';
  if (subtextComparison) {
    subtextComparisonClass = subtextValue >= 0 ? 'text--direction-bad' : 'text--direction-good';
  }

  return (
    <div className="scorecard">
      <h3 className="scorecard__title">{title}</h3>
      <span className="scorecard__big-number">{bigNumber}</span>
      {subtextString != null && (
        <span className={`scorecard__subtext ${subtextComparisonClass}`}>
          {subtextString}
        </span>
      )}
    </div>
  );
};

Scorecard.propTypes = {
  title: PropTypes.string.isRequired,
  bigNumber: PropTypes.string.isRequired,
  subtextValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  subtextFormatter: PropTypes.func,
  subtextComparison: PropTypes.bool
};

Scorecard.defaultProps = {
  subtextValue: '',
  subtextFormatter: (value) => value,
  subtextComparison: false
};

export default Scorecard;
