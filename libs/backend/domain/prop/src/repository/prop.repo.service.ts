import type {
  Prop,
  PropOptions,
  PropWhere,
} from '@codelab/backend/abstract/codegen'
import type { IPropDto } from '@codelab/shared/abstract/core'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  OgmService,
  propSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { propMapper } from '@codelab/shared-domain-module/prop'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PropRepository extends AbstractRepository<
  IPropDto,
  Prop,
  PropWhere,
  PropOptions
> {
  constructor(
    private ogmService: OgmService,

    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(props: Array<IPropDto>) {
    return (
      await (
        await this.ogmService.Prop
      ).create({
        input: props.map((prop) => propMapper.toCreateInput(prop)),
      })
    ).props
  }

  protected async _find({
    options,
    where,
  }: {
    where?: PropWhere
    options?: PropOptions
  }) {
    return await (
      await this.ogmService.Prop
    ).find({
      options,
      selectionSet: `{${propSelectionSet}}`,
      where,
    })
  }

  protected async _update(props: IPropDto, where: PropWhere) {
    return (
      await (
        await this.ogmService.Prop
      ).update({
        update: propMapper.toUpdateInput(props),
        where,
      })
    ).props[0]
  }
}
