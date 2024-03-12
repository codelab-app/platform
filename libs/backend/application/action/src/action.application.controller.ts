import { type ICreateActionData } from '@codelab/shared/abstract/core'
import { Body, Controller, Post } from '@nestjs/common'
import { ActionApplicationService } from './action.application.service'

@Controller('action')
export class ActionApplicationController {
  constructor(private actionApplicationService: ActionApplicationService) {}

  @Post('create-action')
  async createAction(@Body() createActionData: ICreateActionData) {
    return this.actionApplicationService.createAction(createActionData)
  }
}
