import { Module } from '@nestjs/common'
import { ResourceApplicationController } from './resource.application.controller'

@Module({
  controllers: [ResourceApplicationController],
})
export class ResourceApplicationModule {}
