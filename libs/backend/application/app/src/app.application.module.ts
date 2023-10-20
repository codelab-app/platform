import { AtomApplicationModule } from '@codelab/backend/application/atom'
import { AuthModule } from '@codelab/backend/application/shared'
import { AppDomainModule } from '@codelab/backend/domain/app'
import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { DomainDomainModule } from '@codelab/backend/domain/domain'
import { ElementDomainModule } from '@codelab/backend/domain/element'
import { PageDomainModule } from '@codelab/backend/domain/page'
import { PropDomainModule } from '@codelab/backend/domain/prop'
import { AuthDomainModule } from '@codelab/backend/domain/shared/auth'
import { StoreDomainModule } from '@codelab/backend/domain/store'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AppApplicationController } from './app.application.controller'
import {
  ExportAppsHandler,
  ImportAppHandler,
  SeedCypressAppHandler,
} from './use-case'

@Module({
  controllers: [AppApplicationController],
  exports: [SeedCypressAppHandler, ExportAppsHandler, ImportAppHandler],
  imports: [
    AtomDomainModule,
    AuthDomainModule,
    AppDomainModule,
    PageDomainModule,
    AtomApplicationModule,
    PropDomainModule,
    ElementDomainModule,
    StoreDomainModule,
    TypeDomainModule,
    DomainDomainModule,
    AuthModule,
    CqrsModule,
  ],
  providers: [SeedCypressAppHandler, ExportAppsHandler, ImportAppHandler],
})
export class AppApplicationModule {}
