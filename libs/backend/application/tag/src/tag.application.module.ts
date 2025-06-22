import { AuthDomainModule } from '@codelab/backend-domain-shared-auth'
import { TagDomainModule } from '@codelab/backend-domain-tag'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { TagApplicationController } from './tag.application.controller'
import {
  ExportTagsHandler,
  ImportTagsHandler,
  SeedE2eTagsHandler,
  SeedTagsService,
} from './use-case'

@Module({
  controllers: [TagApplicationController],
  exports: [SeedTagsService],
  imports: [CqrsModule, TagDomainModule, AuthDomainModule],
  providers: [
    ExportTagsHandler,
    ImportTagsHandler,
    SeedE2eTagsHandler,
    SeedTagsService,
  ],
})
export class TagApplicationModule {}
