import { getSession } from '@auth0/nextjs-auth0'
import { ServerResponse } from 'http'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const proxy = createProxyMiddleware({
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
  onProxyReq: async (proxyReq, req, res) => {
    // console.log(req)
    // console.log(session)
    const session = await getSession(req, res as ServerResponse)

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
})

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

const handler: NextApiHandler = async (req, res) => {
  await runMiddleware(req, res, proxy)
}

export default handler
