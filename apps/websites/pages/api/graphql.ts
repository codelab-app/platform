import {
  authMiddleware,
  corsMiddleware,
} from '@codelab/backend/infra/adapter/graphql'
import { getEnv } from '@codelab/shared/config'
import type { NextApiHandler } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res)
  await authMiddleware(req, res)

  await httpProxyMiddleware(req, res, {
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

export default handler
