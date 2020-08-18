import { Module } from '@nestjs/common'
import { RouterModule, RouterService } from '@codelab/api-router'
import restify from 'express-restify-mongoose'
import { SchemaModule } from 'libs/api/model/src/schema'

@Module({
  imports: [RouterModule, SchemaModule],
})
export class RestifyModule {
  constructor(
    private readonly routerService: RouterService,
    private readonly modelService: ModelService,
  ) {
    console.log(schemaService.componentsJsonSchema)
    restify.serve(routerService.expressRouter, '')
  }
}
