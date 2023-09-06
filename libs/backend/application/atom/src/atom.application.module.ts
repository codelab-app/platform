import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ExportAtomsHandler, ImportAtomHandler } from './use-case'

@Module({
  exports: [ExportAtomsHandler, ImportAtomHandler],
  imports: [CqrsModule, AtomDomainModule, ValidationModule],
  providers: [ExportAtomsHandler, ImportAtomHandler],
})
export class AtomApplicationModule {}
