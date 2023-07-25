import { Module } from '@nestjs/common'
import { AtomRepository } from './repository'

@Module({
  exports: [AtomRepository],
  providers: [AtomRepository],
})
export class AtomDomainModule {}
