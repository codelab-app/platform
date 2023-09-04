import { AtomDomainModule } from '@codelab/backend/domain/atom'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { AtomService } from './atom.service'
import { ExportAtomsHandler, ImportAtomHandler } from './use-case'

@Module({
  exports: [AtomService, ExportAtomsHandler, ImportAtomHandler],
  imports: [CqrsModule, AtomDomainModule],
  providers: [AtomService, ExportAtomsHandler, ImportAtomHandler],
})
export class AtomApplicationModule {}
