import { TagDomainModule } from '@codelab/backend/domain/tag'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TagApplicationController } from './tag.application.controller'
import {
  ExportTagsHandler,
  ImportTagsHandler,
  SeedCypressTagsHandler,
} from './use-case'

@Module({
  controllers: [TagApplicationController],
  exports: [ExportTagsHandler, ImportTagsHandler, SeedCypressTagsHandler],
  imports: [CqrsModule, TagDomainModule],
  providers: [ExportTagsHandler, ImportTagsHandler, SeedCypressTagsHandler],
})
export class TagApplicationModule {}
