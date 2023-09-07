import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AtomApplicationService } from './services/atom.application.service'
import { ExportAtomHandler, ImportAtomHandler } from './use-case'

@Module({
  exports: [ExportAtomHandler, ImportAtomHandler, AtomApplicationService],
  imports: [CqrsModule, AtomDomainModule, ValidationModule],
  providers: [ExportAtomHandler, ImportAtomHandler, AtomApplicationService],
})
export class AtomApplicationModule {}
