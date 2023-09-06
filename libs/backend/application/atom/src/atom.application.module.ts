import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ExportAtomsHandler, ImportAtomHandler } from './use-case'

@Module({
  exports: [ExportAtomsHandler, ImportAtomHandler],
  imports: [CqrsModule, AtomDomainModule],
  providers: [ExportAtomsHandler, ImportAtomHandler],
})
export class AtomApplicationModule {}
