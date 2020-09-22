module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  // assetPrefix: `http://storage.googleapis.com/codelab_doc/images`,
  plugins: [
    'gatsby-plugin-tsconfig-paths',
    {
      resolve: 'gatsby-source-typedoc',
      options: {
        // Array of Typescript files to
        // include
        src: [`${__dirname}/src/components/Menu.tsx`],

        // Options passed to Typedoc Application
        // Usually corresponds to CLI args directly
        typedoc: {
          target: 'es5',
          mode: 'modules',
          tsconfig: `${__dirname}/tsconfig.json`,
        },
      },
    },
    // Add markdown page https://www.gatsbyjs.org/docs/adding-markdown-pages/
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // name: `markdown-pages`,
        path: `${__dirname}/src/pages--md`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets`,
      },
    },
    // `gatsby-plugin-ffmpeg`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
            },
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, // Optional: Will remove related videos from the
              // end of an embedded YouTube video.
              noIframeBorder: true, // Optional: Disable insertion of <style>
              // border: 0
              urlOverrides: [
                {
                  id: 'google',
                  embedURL: (videoId) =>
                    `https://storage.cloud.google.com/codelab_doc/videos/${videoId}`,
                },
                {
                  id: 'youtube',
                  embedURL: (videoId) =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], // Optional: Override URL of a service provider, e.g to enable
              // youtube-nocookie support
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 640,
            },
          },
          `gatsby-remark-attr`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        // isTSX: true, // defaults to false
        // jsxPragma: `jsx`, // defaults to "React"
        // allExtensions: true, // defaults to false
        allowNamespaces: true,
      },
    },
    `gatsby-plugin-sass`,
    // Defaults
    `gatsby-plugin-react-helmet`,
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
        icon: `src/assets/images/gatsby-icon.png`, // This path is relative to
        // the root of the site.
      },
    },
  ],
}
