import { ApolloClientModule, AuthModule, DGraphModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { PropResolver } from './prop.resolver'
import { GetPropsService } from './use-cases'

@Module({
  imports: [DGraphModule, AuthModule, ApolloClientModule],
  providers: [GetPropsService, PropResolver],
  exports: [],
})
export class PropModule {}
