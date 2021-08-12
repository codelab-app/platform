import { Void } from '@codelab/backend/infra'
import { Module } from '@nestjs/common'
import { TagMapper } from './tag.mapper'
import { TagResolver } from './tag.resolver'
import { CreateTagService } from './use-cases/create-tag'
import { DeleteTagService } from './use-cases/delete-tag'
import { GetTagTreeService } from './use-cases/get-tag-tree'
import { GetTagsService } from './use-cases/get-tags'
import { UpdateTagService } from './use-cases/update-tag'

const services = [
  CreateTagService,
  DeleteTagService,
  UpdateTagService,
  GetTagTreeService,
  GetTagsService,
]

@Module({
  providers: [TagResolver, TagMapper, ...services, Void],
  exports: [...services],
})
export class TagModule {}
