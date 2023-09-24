import { SharedDomainModule } from '@codelab/backend/domain/shared'
import { Module } from '@nestjs/common'
import { PageRepository } from './repository'

@Module({
  exports: [PageRepository],
  imports: [SharedDomainModule],
  providers: [PageRepository],
})
export class PageDomainModule {}
