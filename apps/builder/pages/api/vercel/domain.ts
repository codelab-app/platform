import { vercelApis } from '@codelab/backend/infra/adapter/vercel'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { NextApiHandler } from 'next'
import { z } from 'zod'

export const deleteDomain: NextApiHandler = async (req, res) => {
  const { name } = req.query

  if (req.method !== 'DELETE') return res.status(404).send('Wrong http method')

  const session = auth0Instance.getSession(req, res)
  if (!session?.user) {
    return res.status(403).send('Not Authenticated')
  }

  const maybeDomain = z.string().safeParse(name)
  if (!maybeDomain.success) return res.status(400).send(maybeDomain.error)

  const vercelRes = await vercelApis.domain.deleteDomain(maybeDomain.data)

  return res.status(vercelRes.status).send(vercelRes.ok)
}

export default deleteDomain
