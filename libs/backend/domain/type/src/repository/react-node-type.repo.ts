import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  exportReactNodeTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IReactNodeTypeDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'

export class ReactNodeTypeRepository extends AbstractRepository<
  IReactNodeTypeDTO,
  OGM_TYPES.ReactNodeType,
  OGM_TYPES.ReactNodeTypeWhere
> {
  private ReactNodeType = Repository.instance.ReactNodeType

  async find(where: OGM_TYPES.ReactNodeTypeWhere) {
    return await (
      await this.ReactNodeType
    ).find({
      selectionSet: exportReactNodeTypeSelectionSet,
      where,
    })
  }

  protected async _add(reactNodeTypes: Array<IReactNodeTypeDTO>) {
    return (
      await (
        await this.ReactNodeType
      ).create({
        input: reactNodeTypes.map(
          ({ __typename, owner, ...reactNodeType }) => ({
            ...reactNodeType,
            owner: connectAuth0Owner(owner),
          }),
        ),
        selectionSet: `{ reactNodeTypes ${exportReactNodeTypeSelectionSet} }`,
      })
    ).reactNodeTypes
  }

  protected async _update(
    { __typename, id, name, owner }: IReactNodeTypeDTO,
    where: OGM_TYPES.ReactNodeTypeWhere,
  ) {
    return (
      await (
        await this.ReactNodeType
      ).update({
        selectionSet: `{ reactNodeTypes ${exportReactNodeTypeSelectionSet} }`,
        update: { name },
        where,
      })
    ).reactNodeTypes[0]
  }
}
