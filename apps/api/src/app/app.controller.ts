import { Controller, Get, Inject } from '@nestjs/common'
import { MONGOOSE_MODELS } from '@codelab/api-model'
import { cLog } from '@codelab/utils'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(MONGOOSE_MODELS) private readonly mongooseModels,
  ) {}

  @Get()
  getData() {
    return this.appService.getData()
  }

  @Get('models')
  models() {
    cLog(this.mongooseModels.component.schema.paths)

    return this.mongooseModels
  }
}
