import { Body, Controller, Post } from '@nestjs/common'
import { LambdaService } from './LambdaService'
import { IEventTrigger, ILambda } from './interfaces/IEventTrigger'

@Controller('lambda')
export class LambdaController {
  constructor(private readonly lambdaService: LambdaService) {}

  @Post()
  async createLambda(@Body() body: IEventTrigger) {
    const lambda: ILambda = body.event.data.new

    return await this.lambdaService.createLambda(lambda)
  }

  @Post('delete')
  async deleteLambda(@Body() body: IEventTrigger) {
    const lambda: ILambda = body.event.data.old

    return await this.lambdaService.deleteLambda(lambda)
  }

  @Post('update')
  async updateLambda(@Body() body: IEventTrigger) {
    const lambda: ILambda = body.event.data.new

    return await this.lambdaService.updateLambda(lambda)
  }

  @Post('execute')
  async executeLambda(@Body() body: any) {
    const a = body
    const payload = JSON.parse(body.input.payload)
    const result = await this.lambdaService.executeLambda(
      body.input.lambda,
      payload,
    )

    return { payload: result }
  }
}
