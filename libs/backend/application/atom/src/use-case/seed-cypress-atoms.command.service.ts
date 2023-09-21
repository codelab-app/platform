/* eslint-disable @nx/enforce-module-boundaries */
import type { Atom as IAtom } from '@codelab/backend/abstract/codegen'
import { Atom, AtomRepository } from '@codelab/backend/domain/atom'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import { Span } from '@codelab/backend/infra/adapter/otel'
import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import { type IAtomDTO, IAtomType } from '@codelab/shared/abstract/core'
import { createAtomsApiData, createAtomsData } from '@codelab/shared/data/test'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'
import { Interface } from 'readline'

export class SeedCypressAtomsCommand {}

@CommandHandler(SeedCypressAtomsCommand)
export class SeedCypressAtomsHandler
  implements ICommandHandler<SeedCypressAtomsCommand, Array<IAtomDTO>>
{
  constructor(
    private atomRepository: AtomRepository,
    private interfaceTypeRepository: InterfaceTypeRepository,
  ) {}

  /**
   * Default `atom` for `Element.renderType` may already exist, so we save by name
   */
  @Span()
  async execute() {
    const atomsData = createAtomsData()
      // ReactFragment is already seeded
      .filter((atom) => atom.name !== IAtomType.ReactFragment)

    const apisData = createAtomsApiData(atomsData)

    /**
     * Create the api for the atoms
     */
    for await (const api of apisData) {
      const interfaceTypeModel = new InterfaceType(api)

      await this.interfaceTypeRepository.save(interfaceTypeModel)
    }

    const atoms: Array<IAtomDTO> = []

    /**
     * Create the atoms
     */
    for await (const atomData of atomsData) {
      const atomModel = Atom.create(atomData)
      const atom = await this.atomRepository.save(atomModel)

      atoms.push(atom)
    }

    return atoms
  }
}
