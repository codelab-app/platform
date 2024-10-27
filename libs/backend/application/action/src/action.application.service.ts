import type { ICreateActionData } from '@codelab/shared/abstract/core'

import { ActionFactory } from '@codelab/backend/domain/action'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { actionFactory, actionMapper } from '@codelab/shared/domain-old'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ActionApplicationService {
  constructor(
    private factory: ActionFactory,
    private loggerService: CodelabLoggerService,
  ) {}

  async createAction(createActionData: ICreateActionData) {
    const actionDto = actionFactory.mapDataToDto(createActionData)

    // this.loggerService.log(actionDto, `${this.constructor.name}.createAction()`)

    return this.factory.save(actionDto)
  }
}
