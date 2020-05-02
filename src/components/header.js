import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const Header = ({ siteTitle }) => (
  <header className="header">
    <Link to="/" className="header__site-title">{siteTitle}</Link>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
