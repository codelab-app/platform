import type {
  ReactNodeType,
  ReactNodeTypeOptions,
  ReactNodeTypeWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  exportReactNodeTypeSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IReactNodeTypeDto } from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/domain/mapper'
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
    protected traceService: TraceService,
    protected validationService: ValidationService,
    protected loggerService: CodelabLoggerService,
    private authService: AuthDomainService,
  ) {
    super(traceService, validationService, loggerService)
  }

  protected async _addMany(reactNodeTypes: Array<IReactNodeTypeDto>) {
    return (
      await (
        await this.ogmService.ReactNodeType
      ).create({
        input: reactNodeTypes.map(({ __typename, ...reactNodeType }) => ({
          ...reactNodeType,
          owner: connectOwner(this.authService.currentUser),
        })),
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
      selectionSet: `{ ${exportReactNodeTypeSelectionSet} }`,
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
