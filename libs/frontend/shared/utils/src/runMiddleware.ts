import type { NextApiRequest, NextApiResponse } from 'next'

export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: unknown,
) => {
  return new Promise((resolve, reject) => {
    return fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
