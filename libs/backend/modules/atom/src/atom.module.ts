import { Void } from '@codelab/backend/infra'
import { TypeModule } from '@codelab/backend/modules/type'
import { Module } from '@nestjs/common'
import { AtomResolver } from './atom.resolver'
import { AtomAdapter } from './domain/atom.adapter'
import {
  CreateAtomService,
  DeleteAtomService,
  GetAtomService,
  GetAtomsService,
  UpdateAtomService,
} from './use-cases'

const services = [
  CreateAtomService,
  GetAtomsService,
  DeleteAtomService,
  GetAtomService,
  UpdateAtomService,
  AtomAdapter,
]

@Module({
  imports: [TypeModule],
  providers: [AtomResolver, ...services, Void],
  exports: [...services],
})
export class AtomModule {}
