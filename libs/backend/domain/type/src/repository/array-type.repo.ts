import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  exportArrayTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IArrayTypeDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import {
  connectAuth0Owner,
  connectNodeId,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'

export class ArrayTypeRepository extends AbstractRepository<
  IArrayTypeDTO,
  OGM_TYPES.ArrayType,
  OGM_TYPES.ArrayTypeWhere
> {
  private ArrayType = Repository.instance.ArrayType

  async find(where: OGM_TYPES.ArrayTypeWhere) {
    return await (
      await this.ArrayType
    ).find({
      selectionSet: exportArrayTypeSelectionSet,
      where,
    })
  }

  protected async _add(primitiveTypes: Array<IArrayTypeDTO>) {
    return (
      await (
        await this.ArrayType
      ).create({
        input: primitiveTypes.map(
          ({ __typename, itemType, owner, ...type }) => ({
            ...type,
            itemType: connectNodeId(itemType?.id),
            owner: connectAuth0Owner(owner),
          }),
        ),
        selectionSet: `{ arrayTypes ${exportArrayTypeSelectionSet} }`,
      })
    ).arrayTypes
  }

  protected async _update(
    { __typename, id, itemType, name, owner, ...primitiveType }: IArrayTypeDTO,
    where: OGM_TYPES.ArrayTypeWhere,
  ) {
    return (
      await (
        await this.ArrayType
      ).update({
        selectionSet: `{ arrayTypes ${exportArrayTypeSelectionSet} }`,
        update: {
          itemType: reconnectNodeId(itemType?.id),
          name,
        },
        where,
      })
    ).arrayTypes[0]
  }
}
