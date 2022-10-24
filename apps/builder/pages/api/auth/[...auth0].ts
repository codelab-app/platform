import { handleLogin } from '@auth0/nextjs-auth0'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { Config } from '@codelab/shared/config'

export default auth0Instance.handleAuth({
  // https://github.com/auth0/nextjs-auth0/issues/383
  // https://github.com/auth0/nextjs-auth0/blob/main/examples/README.md
  logout: async (request, response) => {
    return auth0Instance.handleLogin(request, response, {
      returnTo: '/',
    })
  },
  login: async (request, response) => {
    console.log(Config().auth0.baseUrl)

    return auth0Instance.handleLogin(request, response, {
      returnTo: '/apps',
    })
  },
  callback: async (request, response) => {
    return auth0Instance.handleCallback(request, response, {
      redirectUri: '/apps',
    })
  },
})
