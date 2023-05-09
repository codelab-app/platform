import type {
  ReactNodeType,
  ReactNodeTypeWhere,
} from '@codelab/backend/abstract/codegen'
import {
  exportReactNodeTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IReactNodeTypeDTO } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'

export class ReactNodeTypeRepository extends AbstractRepository<
  IReactNodeTypeDTO,
  ReactNodeType,
  ReactNodeTypeWhere
> {
  private ReactNodeType = Repository.instance.ReactNodeType

  async _find(where: ReactNodeTypeWhere) {
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
    where: ReactNodeTypeWhere,
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
