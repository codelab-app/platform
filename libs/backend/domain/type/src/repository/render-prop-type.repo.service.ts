import type {
  RenderPropType,
  RenderPropTypeOptions,
  RenderPropTypeWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthService } from '@codelab/backend/application/service'
import {
  exportRenderPropTypeSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IRenderPropTypeDTO } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RenderPropTypeRepository extends AbstractRepository<
  IRenderPropTypeDTO,
  RenderPropType,
  RenderPropTypeWhere,
  RenderPropTypeOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
    private authService: AuthService,
  ) {
    super(traceService, validationService)
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
      selectionSet: exportRenderPropTypeSelectionSet,
      where,
    })
  }

  protected async _add(renderPropTypes: Array<IRenderPropTypeDTO>) {
    return (
      await (
        await this.ogmService.RenderPropType
      ).create({
        input: renderPropTypes.map(({ __typename, ...renderPropType }) => ({
          ...renderPropType,
          owner: connectAuth0Owner(this.authService.currentUser),
        })),
        selectionSet: `{ renderPropTypes ${exportRenderPropTypeSelectionSet} }`,
      })
    ).renderPropTypes
  }

  protected async _update(
    { __typename, id, name }: IRenderPropTypeDTO,
    where: RenderPropTypeWhere,
  ) {
    return (
      await (
        await this.ogmService.RenderPropType
      ).update({
        selectionSet: `{ renderPropTypes ${exportRenderPropTypeSelectionSet} }`,
        update: { name },
        where,
      })
    ).renderPropTypes[0]
  }
}
