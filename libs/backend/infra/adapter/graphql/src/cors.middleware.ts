import type { NextApiHandler } from 'next'

export const corsMiddleware: NextApiHandler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')

  /**
   * Not an actual request
   */
  if (req.method === 'OPTIONS') {
    res.end()
  }
}
