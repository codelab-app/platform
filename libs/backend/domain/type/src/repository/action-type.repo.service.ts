import type {
  ActionType,
  ActionTypeOptions,
  ActionTypeWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  exportActionTypeSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IActionTypeDto } from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/domain'
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

    protected validationService: ValidationService,
    protected loggerService: CodelabLoggerService,
    private authService: AuthDomainService,
  ) {
    super(validationService, loggerService)
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
