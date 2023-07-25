import { Module } from '@nestjs/common'
import { PropRepository } from './repository'

@Module({
  exports: [PropRepository],
  providers: [PropRepository],
})
export class PropDomainModule {}
