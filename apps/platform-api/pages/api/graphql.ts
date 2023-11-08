/* eslint-disable unicorn/filename-case */
import { getPlatformListener } from '@codelab/backend/infra/adapter/serverless'
import type { NextApiHandler } from 'next'

/**
 * https://github.com/Skn0tt/nextjs-nestjs-integration-example/issues/30
 */
const handler: NextApiHandler = async (req, res) => {
  const listener = await getPlatformListener()

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
