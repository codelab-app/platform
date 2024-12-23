import type { IFieldDto } from '@codelab/shared/abstract/core'
import type { Field, FieldOptions, FieldWhere } from '@codelab/shared/infra/gql'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { FieldFragment } from '@codelab/shared/infra/gql'
import { fieldApi, fieldMapper } from '@codelab/shared-domain-module/field'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FieldRepository extends AbstractRepository<
  IFieldDto,
  FieldFragment,
  FieldWhere,
  FieldOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: PinoLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(fields: Array<IFieldDto>) {
    const {
      createFields: { fields: createdFields },
    } = await fieldApi().CreateFields({
      input: fields.map((field) => fieldMapper.toCreateInput(field)),
    })

    return createdFields
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
