import type {
  ICreatePrimitiveType,
  IPrimitiveType,
  ITypeFactory,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { PrimitiveType } from '../model'
import { PrimitiveTypeRepository } from '../repository/primitive-type.repo'

/**
 * We only require user, since all other info is unchangeable
 */
export class PrimitiveTypeFactory
  implements ITypeFactory<ICreatePrimitiveType>
{
  repository: PrimitiveTypeRepository = new PrimitiveTypeRepository()

  async create(
    { owner, primitiveKind }: ICreatePrimitiveType,
    where: BaseTypeUniqueWhereCallback<IPrimitiveType>,
  ) {
    const primitiveType = PrimitiveType.init({
      __typename: ITypeKind.PrimitiveType,
      primitiveKind,
      owner,
    })

    await this.repository.save(primitiveType, where(primitiveType))

    return primitiveType
  }
}
