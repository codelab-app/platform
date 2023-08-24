/* eslint-disable unicorn/filename-case */
import { authMiddleware } from '@codelab/backend/infra/adapter/graphql'
import { getDataListener } from '@codelab/backend/infra/adapter/serverless'
import type { NextApiHandler } from 'next'

/**
 * https://github.com/Skn0tt/nextjs-nestjs-integration-example/issues/30
 */
const handler: NextApiHandler = async (req, res) => {
  // await corsMiddleware(req, res)
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
}

export default handler
