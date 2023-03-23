import { IUseCase } from '@codelab/backend/abstract/types'
import {
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
import { systemTypesData } from './system-types.data'

export class SeedSystemTypeService extends IUseCase<IAuth0Owner, void> {
  primitiveTypeRepository: PrimitiveTypeRepository =
    new PrimitiveTypeRepository()

  interfaceTypeRepository: InterfaceTypeRepository =
    new InterfaceTypeRepository()

  async _execute(owner: IAuth0Owner) {
    await Promise.all(
      Object.values(systemTypesData(owner)).map(
        async (systemTypeData) =>
          await TypeFactory.create({ ...systemTypeData, owner }),
      ),
    )
  }
}
