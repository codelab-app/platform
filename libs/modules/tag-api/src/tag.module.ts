import { Void } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { TagResolver } from './tag.resolver'
import { CreateTagService } from './use-cases/create-tag'
import { DeleteTagService } from './use-cases/delete-tag'
import { GetTagService } from './use-cases/get-tag'
import { GetTagsService } from './use-cases/get-tags'
import { UpdateTagService } from './use-cases/update-tag'

const services = [
  CreateTagService,
  DeleteTagService,
  UpdateTagService,
  GetTagService,
  GetTagsService,
]

@Module({
  providers: [TagResolver, ...services, Void],
  exports: [...services],
})
export class TagModule {}
