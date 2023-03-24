/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Atom, AtomRepository } from '@codelab/backend/domain/atom'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import type { IInterfaceTypeDTO } from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { createAtomsData } from '@codelab/shared/data/test'
import type { NextApiHandler } from 'next'

const atomRepository = new AtomRepository()
const interfaceTypeRepository = new InterfaceTypeRepository()

/**
 * Used as endpoint for creating Cypress data
 */
const createAtoms: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance.getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const owner = { auth0Id: session.user.sub }
    const atomsData = createAtomsData(owner)

    const apiData: Array<IInterfaceTypeDTO> = atomsData.map((atom) => ({
      fields: [],
      id: atom.api.id,
      kind: ITypeKind.InterfaceType,
      name: `${atom.name} API`,
      owner,
    }))

    const apis = apiData.map((api) => {
      return new InterfaceType(api)
    })

    await interfaceTypeRepository.add(apis)

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
