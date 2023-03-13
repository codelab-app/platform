import type { IReactNodeType } from '@codelab/backend/abstract/core'
import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  exportReactNodeTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'

export class ReactNodeTypeRepository extends AbstractRepository<IReactNodeType> {
  private ReactNodeType = Repository.instance.ReactNodeType

  async find(where: BaseTypeUniqueWhere) {
    return (
      await (
        await this.ReactNodeType
      ).find({
        selectionSet: exportReactNodeTypeSelectionSet,
        where,
      })
    )[0]
  }

  protected async _add(reactNodeTypes: Array<IReactNodeType>) {
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
      })
    ).reactNodeTypes
  }

  protected async _update(
    { __typename, id, owner, ...reactNodeType }: IReactNodeType,
    where: BaseTypeUniqueWhere,
  ) {
    return (
      await (
        await this.ReactNodeType
      ).update({
        update: reactNodeType,
        where,
      })
    ).reactNodeTypes[0]
  }
}
