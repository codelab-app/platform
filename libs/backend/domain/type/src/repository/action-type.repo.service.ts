import type { IActionTypeDto, INodeType } from '@codelab/shared-abstract-core'
import type {
  ActionTypeOptions,
  ActionTypeWhere,
} from '@codelab/shared-infra-gqlgen'

import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { AbstractRepository } from '@codelab/backend-infra-core'
import { ActionTypeFragment } from '@codelab/shared-infra-gqlgen'
import {
  actionTypeMapper,
  createTypeApi,
  findTypeApi,
  updateTypeApi,
} from '@codelab/shared-domain-module-type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ActionTypeRepository extends AbstractRepository<
  INodeType.ActionType,
  IActionTypeDto,
  ActionTypeFragment,
  ActionTypeWhere,
  ActionTypeOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
  }

  async _find({
    options,
    where,
  }: {
    where?: ActionTypeWhere
    options?: ActionTypeOptions
  }) {
    const { types } = await findTypeApi().GetActionTypes({
      options,
      where,
    })

    return types
  }

  protected async _addMany(actionTypes: Array<IActionTypeDto>) {
    const {
      types: { types },
    } = await createTypeApi().CreateActionTypes({
      input: actionTypes.map((actionType) =>
        actionTypeMapper.toCreateInput(actionType),
      ),
    })

    return types
  }

  protected async _update(actionType: IActionTypeDto, where: ActionTypeWhere) {
    const {
      types: { types },
    } = await updateTypeApi().UpdateActionTypes({
      update: actionTypeMapper.toUpdateInput(actionType),
      where,
    })

    return types[0]
  }
}
