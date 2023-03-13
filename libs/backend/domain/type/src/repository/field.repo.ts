import type { IField } from '@codelab/backend/abstract/core'
import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  fieldSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IFieldDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'

/**
 * Field name is not enough, since it is not unique.
 *
 * We need to use a composite with api name
 */
export type FieldWhere = BaseTypeUniqueWhere & {
  api: {
    id: string
  }
  key: string
}

export class FieldRepository extends AbstractRepository<
  IFieldDTO,
  OGM_TYPES.Field,
  OGM_TYPES.FieldWhere
> {
  private Field = Repository.instance.Field

  async find(where: FieldWhere) {
    return await (
      await this.Field
    ).find({
      selectionSet: fieldSelectionSet,
      where,
    })
  }

  protected async _add(fields: Array<IField>) {
    return (
      await (
        await this.Field
      ).create({
        input: fields.map(({ api, fieldType, ...field }) => ({
          ...field,
          api: connectNodeId(api.id),
          fieldType: connectNodeId(fieldType.id),
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
    { api, fieldType, ...field }: IField,
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
        },
        where,
      })
    ).fields[0]
  }
}
