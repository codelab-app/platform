import { Void } from '@codelab/backend/abstract/types'
import { ElementModule } from '@codelab/backend/modules/element'
import { CytoscapeModule } from '@codelab/backend/shared/generic'
import { Module } from '@nestjs/common'
import { PageResolver } from './application/page.resolver'
import { PageValidator } from './domain/page.validator'
import { CreatePageService } from './use-cases/create-page'
import { DeletePageService } from './use-cases/delete-page'
import { GetPageService } from './use-cases/get-page'
import { GetPagesService } from './use-cases/get-pages'
import { UpdatePageService } from './use-cases/update-page'

const services = [
  /**
   * Use Cases
   */
  CreatePageService,
  GetPagesService,
  GetPageService,
  UpdatePageService,
  DeletePageService,
  /**
   * Validators
   */
  PageValidator,
]

@Module({
  imports: [ElementModule, CytoscapeModule],
  providers: [PageResolver, ...services, Void],
  exports: [...services],
})
export class PageModule {}
