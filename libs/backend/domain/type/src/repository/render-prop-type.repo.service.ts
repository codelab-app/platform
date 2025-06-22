import type {
  INodeType,
  IRenderPropTypeDto,
} from '@codelab/shared-abstract-core'
import type {
  RenderPropTypeOptions,
  RenderPropTypeWhere,
} from '@codelab/shared-infra-gqlgen'

import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { AbstractRepository } from '@codelab/backend-infra-core'
import { RenderPropTypeFragment } from '@codelab/shared-infra-gqlgen'
import {
  createTypeApi,
  findTypeApi,
  renderPropTypeMapper,
  updateTypeApi,
} from '@codelab/shared-domain-module-type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RenderPropTypeRepository extends AbstractRepository<
  INodeType.RenderPropType,
  IRenderPropTypeDto,
  RenderPropTypeFragment,
  RenderPropTypeWhere,
  RenderPropTypeOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
  }

  protected async _addMany(renderPropTypes: Array<IRenderPropTypeDto>) {
    const {
      types: { types },
    } = await createTypeApi().CreateRenderPropTypes({
      input: renderPropTypes.map((renderPropType) =>
        renderPropTypeMapper.toCreateInput(renderPropType),
      ),
    })

    return types
  }

  protected async _find({
    options,
    where,
  }: {
    where?: RenderPropTypeWhere
    options?: RenderPropTypeOptions
  }) {
    const { types } = await findTypeApi().GetRenderPropTypes({
      options,
      where,
    })

    return types
  }

  protected async _update(
    renderPropType: IRenderPropTypeDto,
    where: RenderPropTypeWhere,
  ) {
    const {
      types: { types },
    } = await updateTypeApi().UpdateRenderPropTypes({
      update: renderPropTypeMapper.toUpdateInput(renderPropType),
      where,
    })

    return types[0]
  }
}
