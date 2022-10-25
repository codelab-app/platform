import { auth0Instance } from '@codelab/shared/adapter/auth0'

export default auth0Instance.handleAuth({
  // https://github.com/auth0/nextjs-auth0/issues/383
  // https://github.com/auth0/nextjs-auth0/blob/main/examples/README.md
  // login: async (req, res) => {
  //   console.log(Config().auth0.baseUrl)
  //
  //   return auth0Instance.handleLogin(req, res, {
  //     returnTo: '/apps',
  //   })
  // },
  // logout: async (req, res) => {
  //   return auth0Instance.handleLogin(req, res, {
  //     returnTo: '/',
  //   })
  // },
  // callback: async (req, res) => {
  //   return auth0Instance.handleCallback(req, res, {
  //     redirectUri: '/apps',
  //   })
  // },
  // profile: async (req, res) => {
  //   return auth0Instance.handleProfile(req, res, {})
  // },
})
