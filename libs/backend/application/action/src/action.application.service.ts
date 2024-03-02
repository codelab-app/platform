import { Injectable } from '@nestjs/common'
import {
  ActionFactory,
  ActionModelFactory,
} from '@codelab/backend/domain/action'
import { ICreateActionData } from '@codelab/shared/abstract/core'
import { ActionMapper } from '@codelab/shared/domain/mapper'

@Injectable()
export class ActionApplicationService {
  constructor(private actionFactory: ActionFactory) {}

  async createAction(createActionData: ICreateActionData) {
    console.log(createActionData)

    const actionDto = ActionMapper.mapDataToDto(createActionData)

    console.log(actionDto)

    return this.actionFactory.save(actionDto)
  }
}
