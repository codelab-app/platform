import { getSession } from '@auth0/nextjs-auth0'
import express from 'express'
import { ServerResponse } from 'http'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

app.use('*', async (baseReq, baseRes, next) => {
  const session = await getSession(baseReq, baseRes as ServerResponse)

  // Need to use 127.0.0.1
  // https://github.com/chimurai/http-proxy-middleware/issues/171
  return createProxyMiddleware({
    target: `${process.env.CODELAB_API_ENDPOINT}/graphql`,
    changeOrigin: true,
    proxyTimeout: 30000,
    secure: false,
    logLevel: 'silent',
    headers: {
      Connection: 'keep-alive',
    },
    pathRewrite: {
      '^/api/graphql': '',
    },
    cookieDomainRewrite: 'localhost',
    onError: (err, req, res) => {
      console.error(err, res.statusCode)
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      })
      res.end('Something went wrong.')
    },
    onProxyReq: (proxyReq, req, res) => {
      if (session) {
        proxyReq.setHeader('Authorization', `Bearer ${session.accessToken}`)
      }

      if (process.env.DG_ADMIN_API_KEY) {
        proxyReq.setHeader('Dg-Auth', process.env.DG_ADMIN_API_KEY)
      }
    },
  })(baseReq, baseRes, next)
})

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

export default app
