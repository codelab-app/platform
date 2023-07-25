import type {
  Prop,
  PropModel,
  PropOptions,
  PropWhere,
} from '@codelab/backend/abstract/codegen'
import {
  OGMService,
  propSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IPropDTO } from '@codelab/shared/abstract/core'
import type { OnModuleInit } from '@nestjs/common'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PropRepository
  extends AbstractRepository<IPropDTO, Prop, PropWhere, PropOptions>
  implements OnModuleInit
{
  private Prop!: PropModel

  constructor(private ogmService: OGMService) {
    super()
  }

  onModuleInit() {
    this.Prop = this.ogmService.getModel('Prop')
  }

  async _find({
    options,
    where,
  }: {
    where?: PropWhere
    options?: PropOptions
  }) {
    return await (
      await this.Prop
    ).find({
      options,
      selectionSet: propSelectionSet,
      where,
    })
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _add(apps: Array<IPropDTO>) {
    return (
      await (
        await this.Prop
      ).create({
        input: apps.map(({ data = '', id }) => ({
          data,
          id,
        })),
      })
    ).props
  }

  protected async _update({ data, id }: IPropDTO, where: PropWhere) {
    return (
      await (
        await this.Prop
      ).update({
        update: {
          data,
        },
        where,
      })
    ).props[0]
  }
}
