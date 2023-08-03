import { Module } from '@nestjs/common'
import { ComponentRepository } from './repository'

@Module({
  exports: [ComponentRepository],
  providers: [ComponentRepository],
})
export class ComponentDomainModule {}
