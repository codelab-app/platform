import type {
  ReactNodeType,
  ReactNodeTypeOptions,
  ReactNodeTypeWhere,
} from '@codelab/backend/abstract/codegen'
import type { IReactNodeTypeDto } from '@codelab/shared/abstract/core'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  baseTypeSelection,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { connectOwner } from '@codelab/shared/domain/orm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ReactNodeTypeRepository extends AbstractRepository<
  IReactNodeTypeDto,
  ReactNodeType,
  ReactNodeTypeWhere,
  ReactNodeTypeOptions
> {
  constructor(
    private ogmService: OgmService,
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(reactNodeTypes: Array<IReactNodeTypeDto>) {
    return (
      await (
        await this.ogmService.ReactNodeType
      ).create({
        input: reactNodeTypes.map(
          ({ __typename, owner, ...reactNodeType }) => ({
            ...reactNodeType,
            owner: connectOwner(owner),
          }),
        ),
      })
    ).reactNodeTypes
  }

  protected async _find({
    options,
    where,
  }: {
    where?: ReactNodeTypeWhere
    options?: ReactNodeTypeOptions
  }) {
    return await (
      await this.ogmService.ReactNodeType
    ).find({
      options,
      selectionSet: `{ ${baseTypeSelection} }`,
      where,
    })
  }

  protected async _update(
    { __typename, id, name }: IReactNodeTypeDto,
    where: ReactNodeTypeWhere,
  ) {
    return (
      await (
        await this.ogmService.ReactNodeType
      ).update({
        update: { name },
        where,
      })
    ).reactNodeTypes[0]
  }
}
