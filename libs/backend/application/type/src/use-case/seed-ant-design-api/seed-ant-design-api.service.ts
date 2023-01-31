import type {
  ITag,
  IUserRef,
  TagNodeData,
} from '@codelab/backend/abstract/core'
import { IInterfaceType } from '@codelab/backend/abstract/core'
import type { IRepository } from '@codelab/backend/abstract/types'
import { IUseCase } from '@codelab/backend/abstract/types'
import { atomsData } from '@codelab/backend/application/atom'
import {
  InterfaceType,
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { ObjectTyped } from 'object-typed'
import { v4 } from 'uuid'

/**
 * Seed both interface types and fields
 */
export class SeedAntDesignApiService extends IUseCase<IUserRef, void> {
  primitiveTypeRepository: PrimitiveTypeRepository =
    new PrimitiveTypeRepository()

  interfaceTypeRepository: InterfaceTypeRepository =
    new InterfaceTypeRepository()

  /**
   * Create empty interfaces from Ant Design atom name
   */
  async _execute(owner: IUserRef) {
    await Promise.all(
      ObjectTyped.keys(atomsData).map(async (name) => {
        // Want to get atom api ID by atom name
        const interfaceType = InterfaceType.createFromAtomName(name, owner)

        // Search existing interface type
        const existingInterfaceType = await this.interfaceTypeRepository.find({
          name: InterfaceType.getApiName({ name }),
        })

        // Keep same ID if exists
        if (existingInterfaceType) {
          interfaceType.id = existingInterfaceType.id
        }

        await this.interfaceTypeRepository.save(interfaceType, {
          name: interfaceType.name,
        })
      }),
    )
  }
}
