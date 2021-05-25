import { ApolloClientModule, AuthModule, DGraphModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { AtomResolver } from './atom.resolver'
import {
  CreateAtomService,
  DeleteAtomService,
  GetAtomService,
  GetAtomsService,
  UpdateAtomService,
} from './use-cases'

@Module({
  imports: [DGraphModule, AuthModule, ApolloClientModule],
  providers: [
    CreateAtomService,
    GetAtomsService,
    AtomResolver,
    DeleteAtomService,
    GetAtomService,
    UpdateAtomService,
  ],
  exports: [],
})
export class AtomModule {}
