import { TagDomainModule } from '@codelab/backend/domain/tag'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TagApplicationController } from './tag.application.controller'
import { ExportTagsHandler, ImportTagsHandler } from './use-case'

@Module({
  controllers: [TagApplicationController],
  exports: [ExportTagsHandler, ImportTagsHandler],
  imports: [CqrsModule, TagDomainModule],
  providers: [ExportTagsHandler, ImportTagsHandler],
})
export class TagApplicationModule {}
