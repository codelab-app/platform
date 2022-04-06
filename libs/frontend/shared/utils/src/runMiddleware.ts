import { NextApiRequest, NextApiResponse } from 'next'

export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: any,
) => {
  return new Promise((resolve, reject) => {
    return fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
