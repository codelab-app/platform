import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'
import { AppRepository } from './repository'
import { AppDomainService } from './service'
import {
  PageDomainModule,
  PageDomainService,
} from '@codelab/backend/domain/page'
import { StoreDomainModule } from '@codelab/backend/domain/store'

@Module({
  exports: [AppRepository, AppDomainService],
  imports: [SharedDomainModule, PageDomainModule],
  providers: [AppRepository, AppDomainService],
})
export class AppDomainModule {}
