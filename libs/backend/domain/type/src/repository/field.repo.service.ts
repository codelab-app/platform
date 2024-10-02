import type {
  Field,
  FieldOptions,
  FieldWhere,
} from '@codelab/backend/abstract/codegen'
import type { IFieldDto } from '@codelab/shared/abstract/core'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  fieldSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FieldRepository extends AbstractRepository<
  IFieldDto,
  Field,
  FieldWhere,
  FieldOptions
> {
  constructor(
    private ogmService: OgmService,

    protected validationService: ValidationService,
    protected loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(fields: Array<IFieldDto>) {
    return (
      await (
        await this.ogmService.Field
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

  protected async _find({
    options,
    where,
  }: {
    where?: FieldWhere
    options: FieldOptions
  }) {
    return await (
      await this.ogmService.Field
    ).find({
      options,
      selectionSet: `{ ${fieldSelectionSet} }`,
      where,
    })
  }

  /**
   * For update, we can't assume if fields exist or not.
   *
   * Scenario: Say a field was deleted, then we run a seeder, we would have to create for the deleted field
   */
  protected async _update(
    { api, fieldType, id, ...field }: IFieldDto,
    where: FieldWhere,
  ) {
    return (
      await (
        await this.ogmService.Field
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
