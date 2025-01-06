import type { IComponentDto, INodeType } from '@codelab/shared/abstract/core'
import type {
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/infra/gql'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { ComponentFragment } from '@codelab/shared/infra/gql'
import { Validator } from '@codelab/shared/infra/typebox'
import {
  componentApi,
  componentMapper,
} from '@codelab/shared-domain-module/component'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ComponentRepository extends AbstractRepository<
  INodeType.Component,
  IComponentDto,
  ComponentFragment,
  ComponentWhere,
  ComponentOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
  }

  async _addMany(components: Array<IComponentDto>) {
    const {
      createComponents: { components: createdComponents },
    } = await componentApi().CreateComponents({
      input: components.map((component) =>
        componentMapper.toCreateInput(component),
      ),
    })

    return createdComponents
  }

  protected async _find({
    options,
    where,
  }: {
    where?: ComponentWhere
    options?: ComponentOptions
  }) {
    const { items } = await componentApi().ComponentList({
      options,
      where,
    })

    return items
  }

  protected async _update(component: IComponentDto, where: ComponentWhere) {
    const {
      updateComponents: { components },
    } = await componentApi().UpdateComponents({
      update: componentMapper.toUpdateInput(component),
      where,
    })

    return components[0]
  }
}
