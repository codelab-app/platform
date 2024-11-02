import type {
  RenderPropType,
  RenderPropTypeOptions,
  RenderPropTypeWhere,
} from '@codelab/backend/abstract/codegen'
import type { IRenderPropTypeDto } from '@codelab/shared/abstract/core'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  baseTypeSelection,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { connectOwner } from '@codelab/shared/domain-old'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RenderPropTypeRepository extends AbstractRepository<
  IRenderPropTypeDto,
  RenderPropType,
  RenderPropTypeWhere,
  RenderPropTypeOptions
> {
  constructor(
    private ogmService: OgmService,
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(renderPropTypes: Array<IRenderPropTypeDto>) {
    return (
      await (
        await this.ogmService.RenderPropType
      ).create({
        input: renderPropTypes.map(
          ({ __typename, owner, ...renderPropType }) => ({
            ...renderPropType,
            owner: connectOwner(owner),
          }),
        ),
      })
    ).renderPropTypes
  }

  protected async _find({
    options,
    where,
  }: {
    where?: RenderPropTypeWhere
    options?: RenderPropTypeOptions
  }) {
    return await (
      await this.ogmService.RenderPropType
    ).find({
      options,
      selectionSet: `{ ${baseTypeSelection} }`,
      where,
    })
  }

  protected async _update(
    { __typename, id, name }: IRenderPropTypeDto,
    where: RenderPropTypeWhere,
  ) {
    return (
      await (
        await this.ogmService.RenderPropType
      ).update({
        update: { name },
        where,
      })
    ).renderPropTypes[0]
  }
}
