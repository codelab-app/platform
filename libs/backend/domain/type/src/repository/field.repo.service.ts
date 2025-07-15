import type { IFieldDto, INodeType } from '@codelab/shared-abstract-core'
import type { FieldOptions, FieldWhere } from '@codelab/shared-infra-gqlgen'

import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { AbstractRepository } from '@codelab/backend-infra-core'
import { fieldApi, fieldMapper } from '@codelab/shared-domain-module-field'
import { FieldFragment } from '@codelab/shared-infra-gqlgen'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FieldRepository extends AbstractRepository<
  INodeType.Field,
  IFieldDto,
  FieldFragment,
  FieldWhere,
  FieldOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
  }

  protected async _addMany(fields: Array<IFieldDto>) {
    try {
      return await this.loggerService.debugWithTiming(
        'FieldRepository._addMany',
        async () => {
          const {
            createFields: { fields: createdFields },
          } = await fieldApi().CreateFields({
            input: fields.map((field) => fieldMapper.toCreateInput(field)),
          })

          return createdFields
        },
        {
          context: 'repository:field',
          data: {
            fieldCount: fields.length,
            fieldIds: fields.map((field) => field.id),
            fieldNames: fields.map((field) => field.key),
          },
        },
      )
    } catch (error) {
      this.loggerService.error('FieldRepository._addMany failed', {
        context: 'repository:field',
        data: {
          error: error instanceof Error ? error.message : 'Unknown error',
          fieldCount: fields.length,
        },
      })
      throw error
    }
  }

  protected async _find({
    options,
    where,
  }: {
    where?: FieldWhere
    options: FieldOptions
  }) {
    const { items } = await fieldApi().GetFields({
      options,
      where,
    })

    return items
  }

  /**
   * For update, we can't assume if fields exist or not.
   *
   * Scenario: Say a field was deleted, then we run a seeder, we would have to create for the deleted field
   */

  protected async _update(field: IFieldDto, where: FieldWhere) {
    const {
      updateFields: { fields },
    } = await fieldApi().UpdateFields({
      update: fieldMapper.toUpdateInput(field),
      where,
    })

    return fields[0]
  }
}
