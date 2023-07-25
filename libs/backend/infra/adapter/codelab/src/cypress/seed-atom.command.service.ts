/* eslint-disable @nx/enforce-module-boundaries */
import { Atom, AtomRepository } from '@codelab/backend/domain/atom'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import type { IAuth0Owner, IAuth0User } from '@codelab/shared/abstract/core'
import { createAtomsApiData, createAtomsData } from '@codelab/shared/data/test'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class SeedAtomCommand implements IAuth0Owner {
  constructor(public owner: IAuth0User) {}
}

@CommandHandler(SeedAtomCommand)
export class SeedAtomHandler implements ICommandHandler<SeedAtomCommand, void> {
  constructor(
    private atomRepository: AtomRepository,
    private interfaceTypeRepository: InterfaceTypeRepository,
  ) {}

  async execute(command: SeedAtomCommand) {
    const { owner } = command
    const atomsData = createAtomsData(owner)
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

    await this.atomRepository.add(atoms)
  }
}
