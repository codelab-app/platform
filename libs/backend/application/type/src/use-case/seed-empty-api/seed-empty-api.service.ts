import type { AtomSeedRecord } from '@codelab/backend/abstract/core'
import { IAuthUseCase, IUseCase } from '@codelab/backend/abstract/types'
import { antdAtomData } from '@codelab/backend/application/atom'
import {
  InterfaceType,
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
} from '@codelab/backend/domain/type'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
import type { IAtomType } from '@codelab/shared/abstract/core'
import { ObjectTyped } from 'object-typed'

/**
 * Seed empty API from atom names
 */
export class SeedEmptyApiService extends IAuthUseCase<Array<IAtomType>, void> {
  interfaceTypeRepository: InterfaceTypeRepository =
    new InterfaceTypeRepository()

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
        // Want to get atom api y atom name
        const interfaceType = InterfaceType.createFromAtomName(name, this.owner)

        // Search existing interface type
        const existingInterfaceType = existingInterfaceTypes.get(
          interfaceType.name,
        )

        // Keep same ID if exists
        if (existingInterfaceType) {
          interfaceType.id = existingInterfaceType.id
        }

        await this.interfaceTypeRepository.save({
          ...interfaceType,
          owner: this.owner,
        })
      }),
    )
  }
}
