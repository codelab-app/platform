import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  propSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IPropDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'

export class PropRepository extends AbstractRepository<
  IPropDTO,
  OGM_TYPES.Prop,
  OGM_TYPES.PropWhere
> {
  private Prop = Repository.instance.Prop

  async find(where: OGM_TYPES.PropWhere = {}) {
    return await (
      await this.Prop
    ).find({
      selectionSet: propSelectionSet,
      where,
    })
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _add(apps: Array<IPropDTO>) {
    return (
      await (
        await this.Prop
      ).create({
        input: apps.map(({ data = '', id }) => ({
          data,
          id,
        })),
      })
    ).props
  }

  protected async _update({ data, id }: IPropDTO, where: OGM_TYPES.PropWhere) {
    return (
      await (
        await this.Prop
      ).update({
        update: {
          data,
        },
        where,
      })
    ).props[0]
  }
}
