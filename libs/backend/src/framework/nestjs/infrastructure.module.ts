import { Module, Provider } from '@nestjs/common'
import { GraphqlModule } from '../../infrastructure/graphql/GraphqlModule'
import { DatabaseModule } from '../../infrastructure/persistence/typeorm/DatabaseModule'

const providers: Array<Provider> = []

@Module({
  imports: [DatabaseModule, GraphqlModule],
  providers,
})
export class InfrastructureModule {}
