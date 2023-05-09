import type { Field, FieldWhere } from '@codelab/backend/abstract/codegen'
import {
  fieldSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IFieldDTO } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'

export class FieldRepository extends AbstractRepository<
  IFieldDTO,
  Field,
  FieldWhere
> {
  private Field = Repository.instance.Field

  async _find(where: FieldWhere = {}) {
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
    where: FieldWhere,
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
