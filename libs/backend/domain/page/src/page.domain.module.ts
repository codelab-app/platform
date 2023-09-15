import { SharedDomainModule } from '@codelab/backend/domain/shared'
import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { Module } from '@nestjs/common'
import { PageRepository } from './repository'

@Module({
  exports: [PageRepository],
  imports: [SharedDomainModule],
  providers: [PageRepository],
})
export class PageDomainModule {}
