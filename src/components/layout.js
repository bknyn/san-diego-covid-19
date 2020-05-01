/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import '../styles/app.sass'
import Header from './header'
import Navigation from './navigation'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query LayoutStaticQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className={`container ${navOpen ? 'nav--open' : 'nav--closed'}`}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Navigation navOpen={navOpen} setNavOpen={setNavOpen} />
      <main className="main">{children}</main>
      {/* <footer className="footer">
        Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer> */}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
