import type { IArrayType } from '@codelab/backend/abstract/core'
import { IRepository } from '@codelab/backend/abstract/types'
import {
  exportArrayTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import { connectOwner } from '@codelab/shared/domain/mapper'

export class ArrayTypeRepository extends IRepository<IArrayType> {
  private ArrayType = Repository.instance.ArrayType

  async find(where: BaseTypeUniqueWhere) {
    return (
      await (
        await this.ArrayType
      ).find({
        where,
        selectionSet: exportArrayTypeSelectionSet,
      })
    )[0]
  }

  protected async _add(primitiveTypes: Array<IArrayType>) {
    return (
      await (
        await this.ArrayType
      ).create({
        input: primitiveTypes.map(({ __typename, owner, ...type }) => ({
          ...type,
          owner: connectOwner(owner.auth0Id),
        })),
      })
    ).arrayTypes
  }

  protected async _update(
    { __typename, owner, ...primitiveType }: IArrayType,
    where: BaseTypeUniqueWhere,
  ) {
    return (
      await (
        await this.ArrayType
      ).update({
        update: primitiveType,
        where,
      })
    ).arrayTypes[0]
  }
}
