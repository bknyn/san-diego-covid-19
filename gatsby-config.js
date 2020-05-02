require('dotenv').config()

const google_private_key = Buffer.from(process.env.GOOGLE_AUTH_COVID_19, 'base64').toString('ascii');

module.exports = {
  siteMetadata: {
    title: `San Diego County COVID-19`,
    description: `Visualizations of COVID-19 in San Diego County`,
    author: `@bpknyn`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-google-spreadsheet",
      options: {
        spreadsheetId: "1nym_Thu2ZEmgsiSrrJYLViZTRuAjSKqvHfEC-kF7hHs",
        typePrefix: "GoogleSpreadsheet",
        credentials: JSON.parse(google_private_key),
        filterNode: () => true,
        mapNode: node => node
      }
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ['Lato:300,400,700']
        }
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
