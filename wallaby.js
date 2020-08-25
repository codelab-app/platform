module.exports = function (wallaby) {
  return {
    autoDetect: true,
    // files: ['libs/**/*.{ts,tsx}'],
    tests: ['libs/factory/**/*.spec.{ts,tsx}'],
  }
}
