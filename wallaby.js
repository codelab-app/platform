module.exports = function () {
  process.env.NEXT_PUBLIC_WEB_HOST = '127.0.0.1:3001'
  process.env.NEO4J_URI = 'bolt://127.0.0.1:7688'

  return {
    autoDetect: true,
  }
}
