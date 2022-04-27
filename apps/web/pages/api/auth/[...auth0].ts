import { handleAuth, Session } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'

const afterCallback = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
  // state,
) => {
  return session
}

export default handleAuth({
  // async callback(req, res) {
  //   try {
  //     await handleCallback(req, res, { afterCallback })
  //   } catch (error) {
  //     if (error instanceof HandlerError) {
  //       res.status(error?.status || 500).end(error?.message)
  //     }
  //   }
  // },
})
