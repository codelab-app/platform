// github.com/eddyerburgh/jest-transform-stub/blob/master/index.js

module.exports = {
  process: function () {
    return {
      code: 'module.exports = ""',
    }
  },
}
