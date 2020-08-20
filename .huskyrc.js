const tasks = (arr) => arr.join(' && ')

// const commitlint = 'yarn commitlint'
const commitlint = 'commitlint -E HUSKY_GIT_PARAMS'
const test = 'yarn test'
const lintstaged = 'cross-env TIMING=1 lint-staged --verbose'

module.exports = {
  hooks: {
    'pre-push': tasks([test]),
    'commit-msg': commitlint,
    'pre-commit': lintstaged,
    'post-rewrite': lintstaged,
  },
}
