import { Injectable } from '@nestjs/common'
import {
  ActionFactory,
  ActionModelFactory,
} from '@codelab/backend/domain/action'
import { ICreateActionData } from '@codelab/shared/abstract/core'
import { ActionMapper } from '@codelab/shared/domain/mapper'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'

@Injectable()
export class ActionApplicationService {
  constructor(
    private actionFactory: ActionFactory,
    private loggerService: CodelabLoggerService,
  ) {}

  async createAction(createActionData: ICreateActionData) {
    const actionDto = ActionMapper.mapDataToDto(createActionData)

    this.loggerService.log(actionDto, 'Create action dto')

    return this.actionFactory.save(actionDto)
  }
}
