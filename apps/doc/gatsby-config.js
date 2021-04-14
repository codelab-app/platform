const path = require('path')

module.exports = {
  siteMetadata: {
    title: `doc`,
    description: `This is a gatsby application created by Nx.`,
  },
  plugins: [
    // User
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: path.resolve(__dirname, '../../libs/modules'),
        ignore: ['**/*.ts{x}'],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
          },
        ],
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-less`,
      options: {
        // loaderOptions: {
        //   appendData: `@env: ${process.env.NODE_ENV};`,
        // },
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
    // System
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        svgo: false,
        ref: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: require.resolve(`@nrwl/gatsby/plugins/nx-gatsby-ext-plugin`),
      options: {
        path: __dirname,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `doc`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`,
      },
    },
  ],
}
