/* eslint-disable @nx/enforce-module-boundaries */
import { TypeFactory } from '@codelab/backend/domain/type'
import { createTypesData } from '@codelab/shared/data/test'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { NextApiHandler } from 'next'

/**
 * Used as endpoint for creating Cypress data
 */
const createTypes: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance.getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const owner = { auth0Id: session.user.sub }
    const typesData = createTypesData(owner)

    /**
     * Create the types
     */
    const types = await Promise.all(
      typesData.map((typeData) => {
        return TypeFactory.save(typeData)
      }),
    )

    return res.send(types)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }
  }

  return res.status(500)
}

export default createTypes
