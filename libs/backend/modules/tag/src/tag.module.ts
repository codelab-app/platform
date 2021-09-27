import { Void } from '@codelab/backend/abstract/types'
import { CytoscapeModule } from '@codelab/backend/shared/generic'
import { Module } from '@nestjs/common'
import { DgraphTagAdapter } from './application/dgraph-tag.adapter'
import { TagAdapter } from './application/tag.adapter'
import { TagResolver } from './application/tag.resolver'
import { CreateTagService } from './use-cases/create-tag'
import { DeleteTagsService } from './use-cases/delete-tags'
import { GetTagService } from './use-cases/get-tag'
import { GetTagGraphService } from './use-cases/get-tag-graph'
import { GetTagGraphsService } from './use-cases/get-tag-graphs'
import { GetTagsService } from './use-cases/get-tags'
import { ImportTagsService } from './use-cases/import-tags'
import { SeedTagTreeService } from './use-cases/seed-tag-tree'
import { UpdateTagService } from './use-cases/update-tag'
import { UpsertTagService } from './use-cases/upsert-tag'

const services = [
  /**
   * Use Cases
   */
  GetTagService,
  CreateTagService,
  DeleteTagsService,
  UpdateTagService,
  GetTagGraphService,
  GetTagGraphsService,
  GetTagsService,
  SeedTagTreeService,
  ImportTagsService,
  UpsertTagService,
  /**
   * Adapters
   */
  TagAdapter,
  DgraphTagAdapter,
]

@Module({
  imports: [CytoscapeModule],
  providers: [TagResolver, ...services, Void],
  exports: [...services],
})
export class TagModule {}
