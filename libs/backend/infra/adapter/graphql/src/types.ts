import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export type NextMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextApiHandler,
) => NextApiHandler | Promise<NextApiHandler>
