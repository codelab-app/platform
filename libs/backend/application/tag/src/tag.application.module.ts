import { TagDomainModule, TagRepository } from '@codelab/backend/domain/tag'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TagApplicationController } from './tag.application.controller'
import {
  ExportTagsHandler,
  ImportTagsHandler,
  SeedCypressTagsHandler,
  SeedTagsService,
} from './use-case'

@Module({
  controllers: [TagApplicationController],
  exports: [
    ExportTagsHandler,
    ImportTagsHandler,
    SeedCypressTagsHandler,
    SeedTagsService,
  ],
  imports: [CqrsModule, TagDomainModule],
  providers: [
    ExportTagsHandler,
    ImportTagsHandler,
    SeedCypressTagsHandler,
    SeedTagsService,
  ],
})
export class TagApplicationModule {}
