import {
  createDomain,
  deleteDomain,
  updateDomain,
} from '@codelab/backend/application/domain'
import type { NextApiHandler } from 'next'

export const productionDomainProxy: NextApiHandler = async (req, res) => {
  const [domainName] = req.query.domains ?? []

  if (!req.url || !domainName) {
    return res.status(400).send('Missing url')
  }

  try {
    let response: Response | null = null

    switch (req.method) {
      case 'DELETE':
        response = await deleteDomain(domainName)
        break
      case 'POST':
        response = await createDomain(domainName)
        break
      case 'PATCH':
        ;[, response] = await updateDomain(req.body.oldName, domainName)
        break
      default:
        throw new Error('Invalid HTTP method')
    }

    const responseType = response.headers.get('Content-Type')
    const isJson = responseType?.includes('application/json')
    const result = isJson ? await response.json() : await response.text()

    return res.status(response.status).send(result)
  } catch (error) {
    console.log(error)

    return res.status(500).send(error)
  }
}

export default productionDomainProxy
