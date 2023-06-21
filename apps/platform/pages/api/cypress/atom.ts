/* eslint-disable @nx/enforce-module-boundaries */
import { Atom, AtomRepository } from '@codelab/backend/domain/atom'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import { createAtomsApiData, createAtomsData } from '@codelab/shared/data/test'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { NextApiHandler } from 'next'

const atomRepository = new AtomRepository()
const interfaceTypeRepository = new InterfaceTypeRepository()

/**
 * Used as endpoint for creating Cypress data
 */
const createAtoms: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance().getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const owner = { auth0Id: session.user.sub }
    const atomsData = createAtomsData(owner)
    const apiData = createAtomsApiData(atomsData)

    /**
     * Create the api for the atoms
     */
    const apis = apiData.map((api) => {
      return new InterfaceType(api)
    })

    await interfaceTypeRepository.add(apis)

    /**
     * Create the atoms
     */
    const atoms = atomsData.map((atomData) => {
      return new Atom(atomData)
    })

    await atomRepository.add(atoms)

    return res.send(atoms)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }
  }

  return res.status(500)
}

export default createAtoms
