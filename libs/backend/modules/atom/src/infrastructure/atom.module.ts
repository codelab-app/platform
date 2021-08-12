import { Void } from '@codelab/backend/infra'
import { TypeModule } from '@codelab/backend/modules/type'
import { Module } from '@nestjs/common'
import {
  CreateAtomService,
  DeleteAtomService,
  GetAtomService,
  GetAtomsService,
  UpdateAtomService,
} from '../use-cases'
import { AtomMapper } from './atom.mapper'
import { AtomResolver } from './atom.resolver'

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
