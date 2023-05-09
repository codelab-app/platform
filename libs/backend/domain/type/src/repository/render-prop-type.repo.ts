import type {
  RenderPropType,
  RenderPropTypeWhere,
} from '@codelab/backend/abstract/codegen'
import {
  exportRenderPropTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IRenderPropTypeDTO } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'

export class RenderPropTypeRepository extends AbstractRepository<
  IRenderPropTypeDTO,
  RenderPropType,
  RenderPropTypeWhere
> {
  private RenderPropType = Repository.instance.RenderPropType

  async _find(where: RenderPropTypeWhere) {
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
    where: RenderPropTypeWhere,
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
