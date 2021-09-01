module.exports = function (options, webpack) {
  return {
    ...options,
    module: {
      ...(options?.module ?? {}),
      rules: [
        ...(options?.module?.rules ?? []),
        {
          test: /\.(tsx|graphql)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-typescript', '@babel/preset-react'],
              },
            },
            { loader: 'graphql-let/loader' },
          ],
        },
      ],
    },
  }
}
