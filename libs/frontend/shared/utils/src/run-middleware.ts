import type { NextApiRequest, NextApiResponse } from 'next'

type CallbackFn = (
  req: NextApiRequest,
  res: NextApiResponse,
  cb: (result: unknown) => unknown,
) => void

export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: CallbackFn,
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        reject(result)

        return
      }

      resolve(result)
    })
  })
}
