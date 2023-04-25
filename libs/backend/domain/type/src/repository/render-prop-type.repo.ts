import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  exportRenderPropTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IRenderPropTypeDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'

export class RenderPropTypeRepository extends AbstractRepository<
  IRenderPropTypeDTO,
  OGM_TYPES.RenderPropType,
  OGM_TYPES.RenderPropTypeWhere
> {
  private RenderPropType = Repository.instance.RenderPropType

  async find(where: OGM_TYPES.RenderPropTypeWhere) {
    return await (
      await this.RenderPropType
    ).find({
      selectionSet: exportRenderPropTypeSelectionSet,
      where,
    })
  }

  protected async _add(renderPropTypes: Array<IRenderPropTypeDTO>) {
    return (
      await (
        await this.RenderPropType
      ).create({
        input: renderPropTypes.map(
          ({ __typename, owner, ...renderPropType }) => ({
            ...renderPropType,
            owner: connectAuth0Owner(owner),
          }),
        ),
        selectionSet: `{ renderPropTypes ${exportRenderPropTypeSelectionSet} }`,
      })
    ).renderPropTypes
  }

  protected async _update(
    { __typename, id, name, owner }: IRenderPropTypeDTO,
    where: OGM_TYPES.RenderPropTypeWhere,
  ) {
    return (
      await (
        await this.RenderPropType
      ).update({
        selectionSet: `{ renderPropTypes ${exportRenderPropTypeSelectionSet} }`,
        update: { name },
        where,
      })
    ).renderPropTypes[0]
  }
}
