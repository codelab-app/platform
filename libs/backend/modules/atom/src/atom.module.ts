import { Void } from '@codelab/backend/abstract/types'
import { TypeModule } from '@codelab/backend/modules/type'
import { Module } from '@nestjs/common'
import { AtomResolver } from './application/atom.resolver'
import { AtomAdapter } from './domain/atom.adapter'
import { CreateAtomService } from './use-cases/create-atom'
import { DeleteAtomService } from './use-cases/delete-atom'
import { GetAtomService } from './use-cases/get-atom'
import { GetAtomsService } from './use-cases/get-atoms'
import { ImportAtomsService } from './use-cases/import-atoms'
import { UpdateAtomService } from './use-cases/update-atom'

const services = [
  /**
   * Use Cases
   */
  CreateAtomService,
  GetAtomsService,
  DeleteAtomService,
  GetAtomService,
  UpdateAtomService,
  ImportAtomsService,
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
