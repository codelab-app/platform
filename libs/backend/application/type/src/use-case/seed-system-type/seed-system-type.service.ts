import type {
  ITag,
  IType,
  IUserRef,
  TagNodeData,
} from '@codelab/backend/abstract/core'
import { IInterfaceType } from '@codelab/backend/abstract/core'
import type { IRepository } from '@codelab/backend/abstract/types'
import { IUseCase } from '@codelab/backend/abstract/types'
import {
  InterfaceType,
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import { systemTypesData } from './system-types.data'

export class SeedSystemTypeService extends IUseCase<IUserRef, void> {
  primitiveTypeRepository: PrimitiveTypeRepository =
    new PrimitiveTypeRepository()

  interfaceTypeRepository: InterfaceTypeRepository =
    new InterfaceTypeRepository()

  async _execute(owner: IUserRef) {
    await Promise.all(
      systemTypesData.map(
        async (type) =>
          await TypeFactory.create(type, owner, { name: type.name }),
      ),
    )
  }
}
