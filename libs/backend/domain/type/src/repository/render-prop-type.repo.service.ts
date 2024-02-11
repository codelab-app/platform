import type {
  RenderPropType,
  RenderPropTypeOptions,
  RenderPropTypeWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import {
  exportRenderPropTypeSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IRenderPropTypeDto } from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/domain/mapper'
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
    protected traceService: TraceService,
    protected validationService: ValidationService,
    private authService: AuthDomainService,
  ) {
    super(traceService, validationService)
  }

  protected async _addMany(renderPropTypes: Array<IRenderPropTypeDto>) {
    return (
      await (
        await this.ogmService.RenderPropType
      ).create({
        input: renderPropTypes.map(({ __typename, ...renderPropType }) => ({
          ...renderPropType,
          owner: connectOwner(this.authService.currentUser),
        })),
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
      selectionSet: `{ ${exportRenderPropTypeSelectionSet} }`,
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
