import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  exportPrimitiveTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IPrimitiveTypeDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'

export class PrimitiveTypeRepository extends AbstractRepository<
  IPrimitiveTypeDTO,
  OGM_TYPES.PrimitiveType,
  OGM_TYPES.PrimitiveTypeWhere
> {
  private PrimitiveType = Repository.instance.PrimitiveType

  async find(where: OGM_TYPES.PrimitiveTypeWhere) {
    return await (
      await this.PrimitiveType
    ).find({
      selectionSet: exportPrimitiveTypeSelectionSet,
      where,
    })
  }

  protected async _add(primitiveTypes: Array<IPrimitiveTypeDTO>) {
    return (
      await (
        await this.PrimitiveType
      ).create({
        input: primitiveTypes.map(({ __typename, owner, ...type }) => ({
          ...type,
          owner: connectAuth0Owner(owner),
        })),
        selectionSet: `{ primitiveTypes ${exportPrimitiveTypeSelectionSet} }`,
      })
    ).primitiveTypes
  }

  protected async _update(
    { __typename, id, name, owner, primitiveKind }: IPrimitiveTypeDTO,
    where: BaseTypeUniqueWhere,
  ) {
    return (
      await (
        await this.PrimitiveType
      ).update({
        selectionSet: `{ primitiveTypes ${exportPrimitiveTypeSelectionSet} }`,
        // Disallow updates
        update: {},
        where,
      })
    ).primitiveTypes[0]
  }
}
