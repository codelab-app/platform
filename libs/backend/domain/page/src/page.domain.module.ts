import { Module } from '@nestjs/common'
import { PageRepository } from './repository'

@Module({
  exports: [PageRepository],
  providers: [PageRepository],
})
export class PageDomainModule {}
