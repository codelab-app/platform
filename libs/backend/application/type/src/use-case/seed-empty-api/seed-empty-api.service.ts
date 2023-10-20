import { UseCase } from '@codelab/backend/application/shared'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import { type IAtomType } from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import { Injectable } from '@nestjs/common'

/**
 * Seed empty API from atom names
 */
@Injectable()
export class SeedEmptyApiService extends UseCase<Array<IAtomType>, void> {
  constructor(
    private interfaceTypeRepository: InterfaceTypeRepository,
    private owner: IEntity,
  ) {
    super()
  }

  /**
   * Create empty interfaces from Ant Design atom name
   */
  async _execute(atoms: Array<IAtomType>) {
    const existingInterfaceTypes = new Map(
      (await this.interfaceTypeRepository.find()).map((interfaceType) => [
        interfaceType.name,
        interfaceType,
      ]),
    )

    await Promise.all(
      atoms.map(async (name) => {
        // Create empty api from atom name
        const { fields, ...interfaceType } =
          InterfaceType.createFromAtomName(name)

        // Search existing interface type
        const existingInterfaceType = existingInterfaceTypes.get(
          interfaceType.name,
        )

        // Keep same ID if exists
        if (existingInterfaceType) {
          interfaceType.id = existingInterfaceType.id
        }

        await this.interfaceTypeRepository.save({
          fields: [],
          ...interfaceType,
        })
      }),
    )
  }
}
