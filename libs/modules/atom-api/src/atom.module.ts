import { Void } from '@codelab/backend'
import { TypeModule } from '@codelab/modules/type-api'
import { Module } from '@nestjs/common'
import { AtomMapper } from './atom.mapper'
import { AtomResolver } from './atom.resolver'
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
  AtomMapper,
]

@Module({
  imports: [TypeModule],
  providers: [AtomResolver, ...services, Void],
  exports: [...services],
})
export class AtomModule {}
