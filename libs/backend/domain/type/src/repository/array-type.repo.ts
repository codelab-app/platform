import type {
  ArrayType,
  ArrayTypeWhere,
} from '@codelab/backend/abstract/codegen'
import {
  exportArrayTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IArrayTypeDTO } from '@codelab/shared/abstract/core'
import {
  connectAuth0Owner,
  connectNodeId,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'

export class ArrayTypeRepository extends AbstractRepository<
  IArrayTypeDTO,
  ArrayType,
  ArrayTypeWhere
> {
  private ArrayType = Repository.instance.ArrayType

  async _find(where: ArrayTypeWhere) {
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
    where: ArrayTypeWhere,
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
