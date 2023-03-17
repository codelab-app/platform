import type { IOwner } from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import type { AtomSeedData } from '@codelab/backend/application/atom'
import { atomsData } from '@codelab/backend/application/atom'
import {
  InterfaceType,
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
} from '@codelab/backend/domain/type'
import type { IAtomType } from '@codelab/shared/abstract/core'
import { ObjectTyped } from 'object-typed'

/**
 * Seed both interface types and fields
 */
export class SeedAntDesignApiService extends IUseCase<IOwner, void> {
  primitiveTypeRepository: PrimitiveTypeRepository =
    new PrimitiveTypeRepository()

  interfaceTypeRepository: InterfaceTypeRepository =
    new InterfaceTypeRepository()

  /**
   * Allow subset to be seeded for testing
   */
  constructor(
    private readonly data: Partial<Record<IAtomType, AtomSeedData>> = atomsData,
  ) {
    super()
  }

  /**
   * Create empty interfaces from Ant Design atom name
   */
  async _execute(owner: IOwner) {
    const existingInterfaceTypes = new Map(
      (await this.interfaceTypeRepository.find()).map((interfaceType) => [
        interfaceType.name,
        interfaceType,
      ]),
    )

    await Promise.all(
      ObjectTyped.keys(this.data).map(async (name) => {
        // Want to get atom api y atom name
        const interfaceType = InterfaceType.createFromAtomName(name, owner)

        // Search existing interface type
        const existingInterfaceType = existingInterfaceTypes.get(
          interfaceType.name,
        )

        // Keep same ID if exists
        if (existingInterfaceType) {
          interfaceType.id = existingInterfaceType.id
        }

        await this.interfaceTypeRepository.save({ ...interfaceType, owner })
      }),
    )
  }
}
