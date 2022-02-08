import { getSession } from '@auth0/nextjs-auth0'
import express from 'express'
import { ServerResponse } from 'http'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

export const createApiProxyMiddlewareHandler = (env: 'prod' | 'local') => {
  const baseEndpoint =
    env === 'prod'
      ? process.env.CODELAB_API_ENDPOINT
      : process.env.CODELAB_API_ENDPOINT

  return async (baseReq: any, baseRes: any, next: any) => {
    const session = await getSession(baseReq, baseRes as ServerResponse)
    const target = baseEndpoint + '/graphql'

    // Need to use 127.0.0.1
    // https://github.com/chimurai/http-proxy-middleware/issues/171
    return createProxyMiddleware({
      target,
      changeOrigin: true,
      proxyTimeout: 30000,
      secure: false,
      logLevel: 'silent',
      headers: {
        Connection: 'keep-alive',
      },
      pathRewrite: {
        '^prod/api/graphql': '',
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
        // console.log(req.headers.authorization)
        // console.log(session?.accessToken)

        if (session) {
          proxyReq.setHeader('Authorization', `Bearer ${session.accessToken}`)
        } else if (req.headers.authorization) {
          // For SSR session is null, so we instead we use getSession inside getServerSideProps to set graphql request client auth headers
          proxyReq.setHeader('Authorization', req.headers.authorization)
        }

        if (process.env.DG_ADMIN_API_KEY) {
          proxyReq.setHeader('Dg-Auth', process.env.DG_ADMIN_API_KEY)
        }
      },
    })(baseReq, baseRes, next)
  }
}

app.use('*', createApiProxyMiddlewareHandler('local'))

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

export default app
