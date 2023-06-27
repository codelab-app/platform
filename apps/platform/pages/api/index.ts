/**
 * This is the platform api
 */

import type { NextApiHandler } from 'next'

const handler: NextApiHandler = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json({ name: 'John Doe' })
}
