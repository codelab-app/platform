import type {
  ICreatePrimitiveType,
  IPrimitiveType,
} from '@codelab/backend/abstract/core'
import { ITypeFactory } from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { PrimitiveType } from '../model'
import { PrimitiveTypeRepository } from '../repository/primitive-type.repo'

/**
 * We only require user, since all other info is unchangeable
 */
export class PrimitiveTypeFactory extends ITypeFactory<
  ICreatePrimitiveType,
  IPrimitiveType
> {
  repository: PrimitiveTypeRepository = new PrimitiveTypeRepository()

  async _create(
    { owner, primitiveKind }: ICreatePrimitiveType,
    where: BaseTypeUniqueWhereCallback<IPrimitiveType>,
  ) {
    const primitiveType = PrimitiveType.init({
      __typename: ITypeKind.PrimitiveType,
      primitiveKind,
      owner,
    })

    return await this.repository.save(primitiveType, where(primitiveType))
  }
}
