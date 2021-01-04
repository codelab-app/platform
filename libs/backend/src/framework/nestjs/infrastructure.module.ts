import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { GraphqlModule } from '../../infrastructure/graphql/GraphqlModule'
import { DatabaseModule } from '../../infrastructure/persistence/typeorm/DatabaseModule'

const providers: Array<Provider> = []

@Module({
  imports: [CqrsModule, DatabaseModule, GraphqlModule],
  providers,
})
export class InfrastructureModule {}
