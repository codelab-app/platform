import { ElementDomainModule } from '@codelab/backend/domain/element'
import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { StoreDomainModule } from '@codelab/backend/domain/store'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { Module } from '@nestjs/common'

import { PageRepository } from './repository'
import { PageDomainService } from './service'

@Module({
  exports: [PageRepository, PageDomainService],
  imports: [
    SharedDomainModule,
    TypeDomainModule,
    StoreDomainModule,
    ElementDomainModule,
  ],
  providers: [PageRepository, PageDomainService],
})
export class PageDomainModule {}
