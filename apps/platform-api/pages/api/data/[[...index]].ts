/* eslint-disable unicorn/filename-case */
import {
  authMiddleware,
  corsMiddleware,
} from '@codelab/backend/infra/adapter/graphql'
import { getDataListener } from '@codelab/backend/infra/adapter/serverless'
import type { NextApiHandler } from 'next'

/**
 * https://github.com/Skn0tt/nextjs-nestjs-integration-example/issues/30
 */
const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res)

  /**
   * You should handle the OPTIONS request after calling corsMiddleware. The reason is that corsMiddleware likely sets CORS headers that need to be present in the OPTIONS response for preflight requests. When a browser sees an OPTIONS method, it expects to find the CORS headers in the response to decide whether the actual request (POST, GET, etc.) is safe to send.
   */
  if (req.method === 'OPTIONS') {
    res.end()

    return
  }

  await authMiddleware(req, res)

  const listener = await getDataListener()

  await listener(req, res)
}

export const config = {
  api: {
    // Need this false for Nest.js graphql endpoint to work
    bodyParser: false,
    /**
     * https://github.com/vercel/next.js/issues/10439
     *
     * Disable false positive of handler not returning anything
     */
    externalResolver: true,
  },
  maxDuration: 60,
}

export default handler
