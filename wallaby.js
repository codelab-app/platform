module.exports = function () {
  process.env.NEXT_PUBLIC_BUILDER_URL = 'http://127.0.0.1:3001'
  process.env.NEO4J_URI = 'bolt://localhost:7688'

  return {
    autoDetect: true,
  }
}
