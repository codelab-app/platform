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
    target: process.env.CODELAB_API_ENDPOINT + '/graphql',
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
    onError: (err, req, res) => {
      console.log('err', err, res.statusCode)
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      })
      res.end(
        'Something went wrong. And we are reporting a custom error message.',
      )
    },
    onProxyReq: (proxyReq, req, res) => {
      // console.log(req)
      // console.log(session)

      if (session) {
        proxyReq.setHeader('Authorization', `Bearer ${session.accessToken}`)
      }

      // if (req.body) {
      //   const bodyData = JSON.stringify(req.body)
      //   // in case if content-type is application/x-www-form-urlencoded -> we need to change to application/json

      //   proxyReq.setHeader('Content-Type', 'application/json')
      //   proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))

      //   // stream the content
      //   proxyReq.write(bodyData)
      // }
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
