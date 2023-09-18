/* eslint-disable @nx/enforce-module-boundaries */
import type { Atom as IAtom } from '@codelab/backend/abstract/codegen'
import { Atom, AtomRepository } from '@codelab/backend/domain/atom'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import { IAtomDTO } from '@codelab/shared/abstract/core'
import { createAtomsApiData, createAtomsData } from '@codelab/shared/data/test'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class SeedCypressAtomsCommand {}

@CommandHandler(SeedCypressAtomsCommand)
export class SeedCypressAtomsHandler
  implements ICommandHandler<SeedCypressAtomsCommand, Array<IAtom>>
{
  constructor(
    private atomRepository: AtomRepository,
    private interfaceTypeRepository: InterfaceTypeRepository,
  ) {}

  async execute() {
    const atomsData = createAtomsData()
    const apiData = createAtomsApiData(atomsData)

    /**
     * Create the api for the atoms
     */
    const apis = apiData.map((api) => {
      return new InterfaceType(api)
    })

    await this.interfaceTypeRepository.add(apis)

    /**
     * Create the atoms
     */
    const atoms = atomsData.map((atomData) => {
      return Atom.create(atomData)
    })

    return await this.atomRepository.add(atoms)
  }
}
