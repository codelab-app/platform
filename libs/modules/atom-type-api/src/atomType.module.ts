import { ApolloClientModule, AuthModule, DGraphModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { AtomTypeResolver } from './atomType.resolver'
import { GetAtomTypesService } from './use-cases'

@Module({
  imports: [DGraphModule, AuthModule, ApolloClientModule],
  providers: [GetAtomTypesService, AtomTypeResolver],
  exports: [],
})
export class AtomTypeModule {}
