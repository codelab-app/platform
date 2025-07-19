import pluginBan from 'eslint-plugin-ban'

export default [
  {
    plugins: { ban: pluginBan },
    rules: {
      'ban/ban': [
        2, // Error level
        {
          name: 'useSearchParams', // Banning specific usage
        },
      ],
    },
  },
];