import type { IOwner } from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import {
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import { systemTypesData } from './system-types.data'

export class SeedSystemTypeService extends IUseCase<IOwner, void> {
  primitiveTypeRepository: PrimitiveTypeRepository =
    new PrimitiveTypeRepository()

  interfaceTypeRepository: InterfaceTypeRepository =
    new InterfaceTypeRepository()

  async _execute(owner: IOwner) {
    await Promise.all(
      systemTypesData.map(
        async (systemTypeData) =>
          await TypeFactory.create(systemTypeData, owner, (type) => ({
            name: type.name,
          })),
      ),
    )
  }
}
