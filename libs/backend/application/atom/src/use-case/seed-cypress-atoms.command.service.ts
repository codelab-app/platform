/* eslint-disable @nx/enforce-module-boundaries */
import type { Atom as IAtom } from '@codelab/backend/abstract/codegen'
import { Atom, AtomRepository } from '@codelab/backend/domain/atom'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import { Span } from '@codelab/backend/infra/adapter/otel'
import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import type { IAtomDTO } from '@codelab/shared/abstract/core'
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
    const apisData = createAtomsApiData(atomsData)
    // Create a map to store the IDs of the saved InterfaceTypes
    const interfaceTypeIdsMap: Record<string, string> = {}

    /**
     * Create the api for the atoms
     */
    for await (const api of apisData) {
      const interfaceTypeModel = new InterfaceType(api)

      const interfaceType = await this.interfaceTypeRepository.save(
        interfaceTypeModel,
        {
          name: interfaceTypeModel.name,
        },
      )

      // Save the ID in the map
      interfaceTypeIdsMap[interfaceType.name] = interfaceType.id
    }

    const atoms: Array<IAtomDTO> = []

    /**
     * Create the atoms
     */
    for await (const atomData of atomsData) {
      const atomModel = Atom.create(atomData)

      // Replace the API ID with the saved one
      atomModel.api.id = throwIfUndefined(
        interfaceTypeIdsMap[InterfaceType.getApiName(atomData)],
      )

      const atom = await this.atomRepository.save(atomModel, {
        name: atomModel.name,
      })

      atoms.push(atom)
    }

    return atoms
  }
}
