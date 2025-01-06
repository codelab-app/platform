import type { INodeType, IPropDto } from '@codelab/shared/abstract/core'
import type { PropOptions, PropWhere } from '@codelab/shared/infra/gql'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { PropFragment } from '@codelab/shared/infra/gql'
import { Validator } from '@codelab/shared/infra/typebox'
import { propApi, propMapper } from '@codelab/shared-domain-module/prop'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PropRepository extends AbstractRepository<
  INodeType.Prop,
  IPropDto,
  PropFragment,
  PropWhere,
  PropOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(props: Array<IPropDto>) {
    const {
      createProps: { props: createdProps },
    } = await propApi().CreateProps({
      input: props.map((prop) => propMapper.toCreateInput(prop)),
    })

    return createdProps
  }

  protected async _find({
    options,
    where,
  }: {
    where?: PropWhere
    options?: PropOptions
  }) {
    const { items } = await propApi().GetProps({
      options,
      where,
    })

    return items
  }

  protected async _update(props: IPropDto, where: PropWhere) {
    const {
      updateProps: { props: updatedProps },
    } = await propApi().UpdateProps({
      update: propMapper.toUpdateInput(props),
      where,
    })

    return updatedProps[0]
  }
}
