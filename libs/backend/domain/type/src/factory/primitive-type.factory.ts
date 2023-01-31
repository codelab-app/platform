import type {
  IBaseType,
  IPrimitiveType,
  ITypeFactory,
  IUserRef,
} from '@codelab/backend/abstract/core'
import type { IRepository } from '@codelab/backend/abstract/types'
import type {
  BaseUniqueWhere,
  BaseUniqueWhereCallback,
} from '@codelab/shared/abstract/types'
import { PrimitiveType } from '../model'
import { PrimitiveTypeRepository } from '../repository/primitive-type.repo'

export class PrimitiveTypeFactory implements ITypeFactory<IPrimitiveType> {
  repository: PrimitiveTypeRepository = new PrimitiveTypeRepository()

  async create(data: IPrimitiveType, where: BaseUniqueWhere) {
    const primitiveType = new PrimitiveType(data)
    await this.repository.save({ ...primitiveType }, where)

    return primitiveType
  }
}
