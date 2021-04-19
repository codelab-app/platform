const path = require('path')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/styles/antd.less'), 'utf8'),
)

console.log(themeVariables)

module.exports = {
  siteMetadata: {
    title: `doc`,
    description: `This is a gatsby application created by Nx.`,
  },
  plugins: [
    // Add static assets before markdown files
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'uploads',
        path: `${__dirname}/static/uploads`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        remarkPlugins: [
          // require('remark-images'),
        ],
        gatsbyRemarkPlugins: [
          // Relative to `static`
          'gatsby-remark-normalize-paths',
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 480,
            },
          },
          // Adds syntax highlighting to code blocks in markdown files using PrismJS
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '`',
              aliases: {},
            },
          },
          `gatsby-remark-attr`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: path.resolve(__dirname, '../../documentation'),
        ignore: ['**/*.ts{x}', '**/*.md'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: path.resolve(__dirname, '../../libs/modules'),
        ignore: ['**/*.ts{x}', '**/*.md'],
      },
    },
    // https://github.com/bskimball/gatsby-plugin-antd/issues/2
    {
      resolve: `gatsby-plugin-less`,
      options: {
        // loaderOptions: {
        //   appendData: `@env: ${process.env.NODE_ENV};`,
        // },
        lessOptions: {
          modifyVars: themeVariables,
          javascriptEnabled: true,
        },
      },
    },
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        svgo: false,
        ref: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: require.resolve(`@nrwl/gatsby/plugins/nx-gatsby-ext-plugin`),
    //   options: {
    //     path: __dirname,
    //   },
    // },
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
