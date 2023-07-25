import { Module } from '@nestjs/common'
import { ElementRepository } from './repository'

@Module({
  exports: [ElementRepository],
  providers: [ElementRepository],
})
export class ElementDomainModule {}
