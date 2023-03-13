import type { IRenderPropsType } from '@codelab/backend/abstract/core'
import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  exportRenderPropsTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IRenderPropsTypeDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'

export class RenderPropsTypeRepository extends AbstractRepository<
  IRenderPropsTypeDTO,
  OGM_TYPES.RenderPropsType,
  OGM_TYPES.RenderPropsTypeWhere
> {
  private RenderPropsType = Repository.instance.RenderPropsType

  async find(where: OGM_TYPES.RenderPropsTypeWhere) {
    return await (
      await this.RenderPropsType
    ).find({
      selectionSet: exportRenderPropsTypeSelectionSet,
      where,
    })
  }

  protected async _add(renderPropsTypes: Array<IRenderPropsTypeDTO>) {
    return (
      await (
        await this.RenderPropsType
      ).create({
        input: renderPropsTypes.map(
          ({ __typename, owner, ...renderPropsType }) => ({
            ...renderPropsType,
            owner: connectAuth0Owner(owner),
          }),
        ),
      })
    ).renderPropsTypes
  }

  protected async _update(
    { __typename, owner, ...renderPropsType }: IRenderPropsTypeDTO,
    where: OGM_TYPES.RenderPropsTypeWhere,
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
