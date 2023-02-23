import type { IRenderPropsType } from '@codelab/backend/abstract/core'
import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  exportRenderPropsTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'

export class RenderPropsTypeRepository extends AbstractRepository<IRenderPropsType> {
  private RenderPropsType = Repository.instance.RenderPropsType

  async find(where: BaseTypeUniqueWhere) {
    return (
      await (
        await this.RenderPropsType
      ).find({
        where,
        selectionSet: exportRenderPropsTypeSelectionSet,
      })
    )[0]
  }

  // async save(renderPropsType: IRenderPropsType, where?: BaseTypeUniqueWhere) {
  //   if (await this.exists(renderPropsType, where)) {
  //     return this.update(renderPropsType, this.getWhere(renderPropsType, where))
  //   }

  //   return (await this.add([renderPropsType]))[0]
  // }

  protected async _add(renderPropsTypes: Array<IRenderPropsType>) {
    return (
      await (
        await this.RenderPropsType
      ).create({
        input: renderPropsTypes.map(
          ({ __typename, owner, ...renderPropsType }) => ({
            ...renderPropsType,
            owner: connectAuth0Owner(owner.auth0Id),
          }),
        ),
      })
    ).renderPropsTypes
  }

  protected async _update(
    { __typename, owner, ...renderPropsType }: IRenderPropsType,
    where: BaseTypeUniqueWhere,
  ) {
    return (
      await (
        await this.RenderPropsType
      ).update({
        update: renderPropsType,
        where,
      })
    ).renderPropsTypes[0]
  }
}
