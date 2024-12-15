import type {
  ActionType,
  ActionTypeOptions,
  ActionTypeWhere,
} from '@codelab/backend/abstract/codegen'
import type { IActionTypeDto } from '@codelab/shared/abstract/core'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { ActionTypeFragment } from '@codelab/shared/infra/gql'
import {
  createTypeApi,
  findTypeApi,
  typeMapper,
  updateTypeApi,
} from '@codelab/shared-domain-module/type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ActionTypeRepository extends AbstractRepository<
  IActionTypeDto,
  ActionTypeFragment,
  ActionTypeWhere,
  ActionTypeOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
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
    const { types } = await findTypeApi.GetActionTypes({
      options,
      where,
    })

    return types
  }

  protected async _addMany(actionTypes: Array<IActionTypeDto>) {
    const {
      types: { types },
    } = await createTypeApi.CreateActionTypes({
      input: actionTypes.map((actionType) =>
        typeMapper.toCreateInput(actionType),
      ),
    })

    return types
  }

  protected async _update(actionType: IActionTypeDto, where: ActionTypeWhere) {
    const {
      types: { types },
    } = await updateTypeApi.UpdateActionTypes({
      update: typeMapper.toUpdateInput(actionType),
      where,
    })

    return types[0]
  }
}
