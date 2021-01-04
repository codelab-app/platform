import { Module, Provider } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphqlConfig } from '../../infrastructure'
import { TestDatabaseModule } from '../../infrastructure/persistence/typeorm/TestDatabaseModule'

const providers: Array<Provider> = []

@Module({
  imports: [
    TestDatabaseModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlConfig,
    }),
  ],
  providers,
})
export class TestInfrastructureModule {}
