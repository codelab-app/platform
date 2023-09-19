import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { TypeDomainModule } from '@codelab/backend/domain/type'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AtomApplicationService } from './services/atom.application.service'
import {
  ExportAtomHandler,
  ImportAtomHandler,
  SeedCypressAtomsHandler,
} from './use-case'

@Module({
  exports: [
    SeedCypressAtomsHandler,
    ExportAtomHandler,
    ImportAtomHandler,
    AtomApplicationService,
  ],
  imports: [CqrsModule, TypeDomainModule, AtomDomainModule, ValidationModule],
  providers: [
    SeedCypressAtomsHandler,
    ExportAtomHandler,
    ImportAtomHandler,
    AtomApplicationService,
  ],
})
export class AtomApplicationModule {}
