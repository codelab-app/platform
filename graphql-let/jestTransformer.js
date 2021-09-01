// We need this because for some reason jest 27 doesn't work with graphql-let/jestTransformer
// Maybe its related to this PR https://github.com/piglovesyou/graphql-let/pull/548 we can try without this adapter when its merged and published
// And yes, it has to be in graphql-let and named jestTransformer.js in order to be recognized
const graphqlLetTransformer = require('graphql-let/jestTransformer')
const path = require('path')

module.exports = {
  ...graphqlLetTransformer,
  process(src, filename, config, options) {
    const newConfig = {
      ...config,
      ...config.config,
      rootDir: path.join(__dirname, '../'),
    }
    // console.log(JSON.stringify(newConfig, undefined, 4))

    return graphqlLetTransformer.process(src, filename, newConfig, options)
  },
}
