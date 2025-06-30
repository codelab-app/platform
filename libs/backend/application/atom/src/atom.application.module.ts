import { DataModule } from '@codelab/backend-application-data'
import { TypeApplicationModule } from '@codelab/backend-application-type'
import { AtomDomainModule } from '@codelab/backend-domain-atom'
import { AuthDomainModule } from '@codelab/backend-domain-shared-auth'
import { TypeDomainModule } from '@codelab/backend-domain-type'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { AtomApplicationService } from './services/atom.application.service'
import { ExportAtomsHandler } from './use-case'

@Module({
  controllers: [],
  exports: [AtomApplicationService],
  imports: [
    CqrsModule,
    TypeApplicationModule,
    TypeDomainModule,
    AtomDomainModule,
    DataModule,
    AuthDomainModule,
  ],
  providers: [ExportAtomsHandler, AtomApplicationService],
})
export class AtomApplicationModule {}
