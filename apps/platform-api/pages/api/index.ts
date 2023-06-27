import type { NextApiHandler } from 'next'
import { getListener } from '../../src/vercel'

const handler: NextApiHandler = async (req, res) => {
  const listener = await getListener()

  listener(req, res)
}

export default handler
