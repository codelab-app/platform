import type { IPrimitiveType } from '@codelab/backend/abstract/core'
import { IRepository } from '@codelab/backend/abstract/types'
import {
  exportPrimitiveTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import { connectOwner } from '@codelab/shared/domain/mapper'

export class PrimitiveTypeRepository extends IRepository<IPrimitiveType> {
  private PrimitiveType = Repository.instance.PrimitiveType

  async find(where: BaseTypeUniqueWhere) {
    return (
      await (
        await this.PrimitiveType
      ).find({
        where,
        selectionSet: exportPrimitiveTypeSelectionSet,
      })
    )[0]
  }

  protected async _add(primitiveTypes: Array<IPrimitiveType>) {
    return (
      await (
        await this.PrimitiveType
      ).create({
        input: primitiveTypes.map(({ __typename, owner, ...type }) => ({
          ...type,
          owner: connectOwner(owner.auth0Id),
        })),
      })
    ).primitiveTypes
  }

  protected async _update(
    { __typename, owner, ...primitiveType }: IPrimitiveType,
    where: BaseTypeUniqueWhere,
  ) {
    return (
      await (
        await this.PrimitiveType
      ).update({
        update: primitiveType,
        where,
      })
    ).primitiveTypes[0]
  }
}
