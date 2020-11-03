module.exports = {
  stories: [],
  addons: [
    require.resolve('./addons/register.tsx'),
    {
      name: '@storybook/addon-storysource',
      options: {
        // rule: {
        //   // test: [/\.stories\.jsx?$/], This is default
        //   include: [path.resolve(__dirname, '../src')], // You can specify directories
        // },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: true },
        },
      },
    },
    // '@storybook/addon-knobs/register',
  ],
}
