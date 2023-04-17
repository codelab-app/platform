import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  fieldSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IFieldDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'

export class FieldRepository extends AbstractRepository<
  IFieldDTO,
  OGM_TYPES.Field,
  OGM_TYPES.FieldWhere
> {
  private Field = Repository.instance.Field

  async find(where: OGM_TYPES.FieldWhere = {}) {
    return await (
      await this.Field
    ).find({
      selectionSet: fieldSelectionSet,
      where,
    })
  }

  protected async _add(fields: Array<IFieldDTO>) {
    return (
      await (
        await this.Field
      ).create({
        input: fields.map(({ api, fieldType, ...field }) => ({
          ...field,
          api: connectNodeId(api.id),
          fieldType: connectNodeId(fieldType.id),
          nextSibling: connectNodeId(field.nextSibling?.id),
          prevSibling: connectNodeId(field.prevSibling?.id),
        })),
      })
    ).fields
  }

  /**
   * For update, we can't assume if fields exist or not.
   *
   * Scenario: Say a field was deleted, then we run a seeder, we would have to create for the deleted field
   */
  protected async _update(
    { api, fieldType, id, ...field }: IFieldDTO,
    where: OGM_TYPES.FieldWhere,
  ) {
    return (
      await (
        await this.Field
      ).update({
        update: {
          ...field,
          api: reconnectNodeId(api.id),
          fieldType: reconnectNodeId(fieldType.id),
          nextSibling: reconnectNodeId(field.nextSibling?.id),
          prevSibling: reconnectNodeId(field.prevSibling?.id),
        },
        where,
      })
    ).fields[0]
  }
}
