import type { NextApiHandler } from 'next'
import { getListener } from '@codelab/platform-api'

/**
 * https://github.com/Skn0tt/nextjs-nestjs-integration-example/issues/30
 */
const handler: NextApiHandler = async (req, res) => {
  const listener = await getListener()

  listener(req, res)
  // res.end()
  // res.on('finish', () => {
  //   console.log('done')
  // })
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
