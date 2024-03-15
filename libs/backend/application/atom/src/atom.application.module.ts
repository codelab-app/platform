import { DataModule } from '@codelab/backend/application/data'
import { SharedApplicationModule } from '@codelab/backend/application/shared'
import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AtomApplicationController } from './atom.application.controller'
import { AtomApplicationService } from './services/atom.application.service'
import {
  ExportAtomHandler,
  ImportAtomHandler,
  ImportCypressAtomsHandler,
} from './use-case'

@Module({
  controllers: [AtomApplicationController],
  exports: [AtomApplicationService],
  imports: [
    CqrsModule,
    TypeDomainModule,
    AtomDomainModule,
    ValidationModule,
    DataModule,
    SharedApplicationModule,
  ],
  providers: [
    ImportCypressAtomsHandler,
    ExportAtomHandler,
    ImportAtomHandler,
    AtomApplicationService,
  ],
})
export class AtomApplicationModule {}
