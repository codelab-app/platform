import {
  createDomain,
  deleteDomain,
  updateDomain,
} from '@codelab/backend/domain/domain'
import type { NextApiHandler } from 'next'

export const productionDomainProxy: NextApiHandler = async (req, res) => {
  const [domainName] = req.query.domains ?? []

  if (!req.url || !domainName) {
    return res.status(400).send('Missing url')
  }

  let response: Response | null = null

  try {
    switch (req.method) {
      case 'DELETE':
        response = await deleteDomain(domainName)
        break
      case 'POST':
        response = await createDomain(domainName)
        break
      case 'PATCH':
        response = await updateDomain(req.body.oldName, domainName)
        break
      default:
        throw new Error('Invalid HTTP method')
    }

    return res.status(response.status).send(true)
  } catch (error) {
    console.log(error)

    return res.status(500).send(false)
  }
}

export default productionDomainProxy
