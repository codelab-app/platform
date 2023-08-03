import { getEnv } from '@codelab/shared/config'
import type { NextApiHandler } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

// export const proxyMiddleware: NextMiddleware = (req, res, next) => {
//   const proxy = createProxyMiddleware({
//     // your actual server url
//     changeOrigin: true,
//     // rewrite path
//     onProxyReq: (proxyReq) => {
//       // You can add custom logic here
//       // For example, add custom headers
//       // proxyReq.setHeader('X-Custom-Header', 'some value')
//     },
//     pathRewrite: { '^/api/graphql': '/graphql' },
//     target: 'http://localhost:4000/graphql',
//   })

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   proxy(req as any, res as any, next)
// }

export const nextProxyMiddleware: NextApiHandler = async (req, res) => {
  await httpProxyMiddleware(req, res, {
    // pathRewrite: {
    //   '^/api/': '/api/v1/',
    // },
    // pathRewrite: [
    //   {
    //     patternStr: '^/api/graphql',
    //     replaceStr: 'http://localhost:4000/api/graphql',
    //   },
    // ],
    // 127.0.0.1:4000
    target: getEnv().endpoint.platformApiHost,
  })
}
