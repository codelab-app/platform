import type {
  ActionType,
  ActionTypeOptions,
  ActionTypeWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import {
  exportActionTypeSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IActionTypeDto } from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ActionTypeRepository extends AbstractRepository<
  IActionTypeDto,
  ActionType,
  ActionTypeWhere,
  ActionTypeOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
    private authService: AuthDomainService,
  ) {
    super(traceService, validationService)
  }

  async _find({
    options,
    where,
  }: {
    where?: ActionTypeWhere
    options?: ActionTypeOptions
  }) {
    return await (
      await this.ogmService.ActionType
    ).find({
      options,
      selectionSet: `{ ${exportActionTypeSelectionSet} }`,
      where,
    })
  }

  protected async _addMany(actionTypes: Array<IActionTypeDto>) {
    return (
      await (
        await this.ogmService.ActionType
      ).create({
        input: actionTypes.map(({ __typename, ...actionType }) => ({
          ...actionType,
          owner: connectOwner(this.authService.currentUser),
        })),
      })
    ).actionTypes
  }

  protected async _update(
    { __typename, id, name, ...actionType }: IActionTypeDto,
    where: ActionTypeWhere,
  ) {
    return (
      await (
        await this.ogmService.ActionType
      ).update({
        update: { name },
        where,
      })
    ).actionTypes[0]
  }
}
