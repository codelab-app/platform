import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import type { OnModuleInit } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { DomainService } from './domain.service'
import { domainApi } from './graphql'
import { DomainRepository } from './repository'

@Module({
  exports: [DomainRepository],
  imports: [SharedDomainModule],
  providers: [DomainRepository, DomainService],
})
export class DomainDomainModule {}
