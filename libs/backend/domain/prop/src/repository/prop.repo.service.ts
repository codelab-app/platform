import type {
  Prop,
  PropOptions,
  PropWhere,
} from '@codelab/backend/abstract/codegen'
import {
  OgmService,
  propSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IPropDTO } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PropRepository extends AbstractRepository<
  IPropDTO,
  Prop,
  PropWhere,
  PropOptions
> {
  constructor(
    private ogmService: OgmService,
    protected override traceService: TraceService,
    protected override validationService: ValidationService,
  ) {
    super(traceService, validationService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _add(props: Array<IPropDTO>) {
    return (
      await (
        await this.ogmService.Prop
      ).create({
        input: props.map(({ data = '', id }) => ({
          data,
          id,
        })),
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
      selectionSet: propSelectionSet,
      where,
    })
  }

  protected async _update({ data, id }: IPropDTO, where: PropWhere) {
    return (
      await (
        await this.ogmService.Prop
      ).update({
        update: {
          data,
        },
        where,
      })
    ).props[0]
  }
}
