const tasks = (arr) => arr.join(' && ')
const commitlint = 'commitlint -E HUSKY_GIT_PARAMS'
const test = 'yarn test'
const build = 'yarn build'
const lintstaged = 'cross-env TIMING=1 lint-staged --verbose'

module.exports = {
  hooks: {
    'pre-push': tasks([build, test]),
    'commit-msg': commitlint,
    'pre-commit': lintstaged,
    // 'post-rewrite': lintstaged,
  },
}
