import { TagDomainModule } from '@codelab/backend/domain/tag'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ExportTagsHandler, ImportTagsHandler } from './use-case'

@Module({
  exports: [ExportTagsHandler, ImportTagsHandler],
  imports: [CqrsModule, TagDomainModule],
  providers: [ExportTagsHandler, ImportTagsHandler],
})
export class TagApplicationModule {}
