import { Controller, Get } from '@nestjs/common'
import { VertexService } from '../models/vertex/vertex.service'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly vertexService: VertexService,
  ) {}

  @Get()
  getData() {
    return this.appService.getData()
  }

  @Get('vertex')
  vertexSchema() {
    return this.vertexService.schema()
  }
}
