import { Module } from '@nestjs/common'
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
]

@Module({
  providers: [AtomResolver, ...services],
  exports: [...services],
})
export class AtomModule {}
