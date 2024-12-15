import type {
  RichTextType,
  RichTextTypeOptions,
  RichTextTypeWhere,
} from '@codelab/backend/abstract/codegen'
import type { IRichTextTypeDto } from '@codelab/shared/abstract/core'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { RichTextTypeFragment } from '@codelab/shared/infra/gql'
import {
  createTypeApi,
  findTypeApi,
  richTextTypeMapper,
  updateTypeApi,
} from '@codelab/shared-domain-module/type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RichTextTypeRepository extends AbstractRepository<
  IRichTextTypeDto,
  RichTextTypeFragment,
  RichTextTypeWhere,
  RichTextTypeOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(richTextTypes: Array<IRichTextTypeDto>) {
    const {
      types: { types },
    } = await createTypeApi.CreateRichTextTypes({
      input: richTextTypes.map((richTextType) =>
        richTextTypeMapper.toCreateInput(richTextType),
      ),
    })

    return types
  }

  protected async _find({
    options,
    where,
  }: {
    where?: RichTextTypeWhere
    options?: RichTextTypeOptions
  }) {
    const { types } = await findTypeApi.GetRichTextTypes({
      options,
      where,
    })

    return types
  }

  protected async _update(
    richTextType: IRichTextTypeDto,
    where: RichTextTypeWhere,
  ) {
    const {
      types: { types },
    } = await updateTypeApi.UpdateRichTextTypes({
      update: richTextTypeMapper.toUpdateInput(richTextType),
      where,
    })

    return types[0]
  }
}
