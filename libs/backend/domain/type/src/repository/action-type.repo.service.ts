import type {
  ActionType,
  ActionTypeOptions,
  ActionTypeWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthService } from '@codelab/backend/application/service'
import {
  exportActionTypeSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IActionTypeDTO } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ActionTypeRepository extends AbstractRepository<
  IActionTypeDTO,
  ActionType,
  ActionTypeWhere,
  ActionTypeOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
    private authService: AuthService,
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
      selectionSet: exportActionTypeSelectionSet,
      where,
    })
  }

  protected async _add(actionTypes: Array<IActionTypeDTO>) {
    return (
      await (
        await this.ogmService.ActionType
      ).create({
        input: actionTypes.map(({ __typename, ...actionType }) => ({
          ...actionType,
          owner: connectAuth0Owner(this.authService.currentUser),
        })),
        selectionSet: `{ actionTypes ${exportActionTypeSelectionSet} }`,
      })
    ).actionTypes
  }

  protected async _update(
    { __typename, id, name, ...actionType }: IActionTypeDTO,
    where: ActionTypeWhere,
  ) {
    return (
      await (
        await this.ogmService.ActionType
      ).update({
        selectionSet: `{ actionTypes ${exportActionTypeSelectionSet} }`,
        update: { name },
        where,
      })
    ).actionTypes[0]
  }
}
