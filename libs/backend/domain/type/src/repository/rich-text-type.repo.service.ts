import type {
  RichTextType,
  RichTextTypeOptions,
  RichTextTypeWhere,
} from '@codelab/backend/abstract/codegen'
import type { IRichTextTypeDto } from '@codelab/shared/abstract/core'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  baseTypeSelection,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { connectOwner } from '@codelab/shared/domain/orm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RichTextTypeRepository extends AbstractRepository<
  IRichTextTypeDto,
  RichTextType,
  RichTextTypeWhere,
  RichTextTypeOptions
> {
  constructor(
    private ogmService: OgmService,
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(richTextTypes: Array<IRichTextTypeDto>) {
    return (
      await (
        await this.ogmService.RichTextType
      ).create({
        input: richTextTypes.map(({ __typename, owner, ...richTextType }) => ({
          ...richTextType,
          owner: connectOwner(owner),
        })),
      })
    ).richTextTypes
  }

  protected async _find({
    options,
    where,
  }: {
    where?: RichTextTypeWhere
    options?: RichTextTypeOptions
  }) {
    return await (
      await this.ogmService.RichTextType
    ).find({
      options,
      selectionSet: `{ ${baseTypeSelection} }`,
      where,
    })
  }

  protected async _update(
    { __typename, id, name }: IRichTextTypeDto,
    where: RichTextTypeWhere,
  ) {
    return (
      await (
        await this.ogmService.RichTextType
      ).update({
        update: { name },
        where,
      })
    ).richTextTypes[0]
  }
}
