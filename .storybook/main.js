module.exports = {
  stories: [],
  addons: [
    require.resolve('./addons/register.tsx'),
    '@storybook/addon-knobs/register',
  ],
}
