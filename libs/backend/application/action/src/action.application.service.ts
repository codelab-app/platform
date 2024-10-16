import type { ICreateActionData } from '@codelab/shared/abstract/core'

import { ActionFactory } from '@codelab/backend/domain/action'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ActionMapper } from '@codelab/shared/domain-old'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ActionApplicationService {
  constructor(
    private actionFactory: ActionFactory,
    private loggerService: CodelabLoggerService,
  ) {}

  async createAction(createActionData: ICreateActionData) {
    const actionDto = ActionMapper.mapDataToDto(createActionData)

    // this.loggerService.log(actionDto, `${this.constructor.name}.createAction()`)

    return this.actionFactory.save(actionDto)
  }
}
