import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const session = await auth0Instance().getSession(req, res)

  console.log(session)
}

export default handler
