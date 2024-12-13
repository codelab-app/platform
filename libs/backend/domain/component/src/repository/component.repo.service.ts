import type {
  Component,
  ComponentOptions,
  ComponentWhere,
} from '@codelab/backend/abstract/codegen'
import type { IComponentDto } from '@codelab/shared/abstract/core'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  componentSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { componentMapper } from '@codelab/shared-domain-module/component'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ComponentRepository extends AbstractRepository<
  IComponentDto,
  Component,
  ComponentWhere,
  ComponentOptions
> {
  constructor(
    private ogmService: OgmService,
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  async _addMany(components: Array<IComponentDto>) {
    return (
      await (
        await this.ogmService.Component
      ).create({
        input: components.map((component) =>
          componentMapper.toCreateInput(component),
        ),
        selectionSet: `{ components { ${componentSelectionSet} } }`,
      })
    ).components
  }

  protected async _find({
    options,
    where,
  }: {
    where?: ComponentWhere
    options?: ComponentOptions
  }) {
    return await (
      await this.ogmService.Component
    ).find({
      options,
      selectionSet: `{ ${componentSelectionSet} }`,
      where,
    })
  }

  protected async _update(component: IComponentDto, where: ComponentWhere) {
    return (
      await (
        await this.ogmService.Component
      ).update({
        update: componentMapper.toUpdateInput(component),
        where,
      })
    ).components[0]
  }
}
