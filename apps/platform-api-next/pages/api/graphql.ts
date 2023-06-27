import type { NextApiHandler } from 'next'
import { getListener } from '@codelab/platform-api'

/**
 * https://github.com/Skn0tt/nextjs-nestjs-integration-example/issues/30
 */
const handler: NextApiHandler = async (req, res) => {
  const listener = await getListener()

  listener(req, res)
  // res.on('finish', () => {
  //   console.log('done')
  // })
}

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

export default handler
