import { handleAuth, handleCallback, handleLogin } from '@auth0/nextjs-auth0'

export default handleAuth({
  callback: async (req, res) => {
    console.log(req, res)

    try {
      await handleCallback(req, res, {
        // redirectUri: 'https://example.com',
      })
    } catch (error) {
      console.error(error)
    }
  },
})
