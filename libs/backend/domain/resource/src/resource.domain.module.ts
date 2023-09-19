import { Module } from '@nestjs/common'
import { ResourceRepository } from './repository'

@Module({
  exports: [ResourceRepository],
  providers: [ResourceRepository],
})
export class ResourceDomainModule {}
