import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { GraphqlModule } from '../../infrastructure'
import { TestDatabaseModule } from '../../infrastructure/persistence/typeorm/TestDatabaseModule'

const providers: Array<Provider> = []

@Module({
  imports: [CqrsModule, TestDatabaseModule, GraphqlModule],
  providers,
})
export class TestInfrastructureModule {}
