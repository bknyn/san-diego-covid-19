/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = ({ actions }) => {
  const { createPage } = actions

  const segmentTitles = ['Confirmed Cases', 'Hospitalized', 'ICU', 'Deaths']
  const segments = segmentTitles.map(segment => {
    return {
      title: segment,
      slug: segment.toLowerCase().replace(/\s+/g, '-'),
      camelCase: segment.toLowerCase().replace(/\s+([a-z])/g, (g) => g[1].toUpperCase())
    }
  })

  segments.forEach(segment => {
    createPage({
      path: `/${segment.slug}`,
      component: require.resolve(`./src/templates/segment-template.js`),
      context: { segment }
    })
  })
}
