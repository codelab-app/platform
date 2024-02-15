import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'
import { PageRepository } from './repository'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { PageDomainService } from './service'
import { StoreDomainModule } from '@codelab/backend/domain/store'
import { ElementDomainModule } from '@codelab/backend/domain/element'

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
