import { Void } from '@codelab/backend/infra'
import { TypeModule } from '@codelab/backend/modules/type'
import { Module } from '@nestjs/common'
import { AtomResolver } from './application/atom.resolver'
import { AtomAdapter } from './domain/atom.adapter'
import { CreateAtomService } from './use-cases/create-atom/create-atom.service'
import { DeleteAtomService } from './use-cases/delete-atom/delete-atom.service'
import { GetAtomService } from './use-cases/get-atom/get-atom.service'
import { GetAtomsService } from './use-cases/get-atoms/get-atoms.service'
import { UpdateAtomService } from './use-cases/update-atom/update-atom.service'

const services = [
  /**
   * Use Cases
   */
  CreateAtomService,
  GetAtomsService,
  DeleteAtomService,
  GetAtomService,
  UpdateAtomService,
  /**
   * Adapters
   */
  AtomAdapter,
]

@Module({
  imports: [TypeModule],
  providers: [AtomResolver, ...services, Void],
  exports: [...services],
})
export class AtomModule {}
