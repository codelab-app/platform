import { Void } from '@codelab/backend/infra'
import { Module } from '@nestjs/common'
import { TagAdapter } from './tag.adapter'
import { TagResolver } from './tag.resolver'
import { CreateTagService } from './use-cases/create-tag'
import { DeleteTagsService } from './use-cases/delete-tags'
import { GetTagService } from './use-cases/get-tag'
import { GetTagGraphService } from './use-cases/get-tag-graph'
import { GetTagsService } from './use-cases/get-tags'
import { UpdateTagService } from './use-cases/update-tag'

const services = [
  GetTagService,
  CreateTagService,
  DeleteTagsService,
  UpdateTagService,
  GetTagGraphService,
  GetTagsService,
]

@Module({
  providers: [TagResolver, TagAdapter, ...services, Void],
  exports: [...services],
})
export class TagModule {}
