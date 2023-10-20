import { SharedApplicationModule } from '@codelab/backend/application/shared'
import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AtomApplicationController } from './atom.application.controller'
import { AtomApplicationService } from './services/atom.application.service'
import {
  ExportAtomHandler,
  ImportAtomHandler,
  SeedCypressAtomsHandler,
} from './use-case'

@Module({
  controllers: [AtomApplicationController],
  exports: [
    SeedCypressAtomsHandler,
    ExportAtomHandler,
    ImportAtomHandler,
    AtomApplicationService,
  ],
  imports: [
    CqrsModule,
    TypeDomainModule,
    AtomDomainModule,
    ValidationModule,
    OtelModule,
    SharedApplicationModule,
  ],
  providers: [
    SeedCypressAtomsHandler,
    ExportAtomHandler,
    ImportAtomHandler,
    AtomApplicationService,
  ],
})
export class AtomApplicationModule {}
