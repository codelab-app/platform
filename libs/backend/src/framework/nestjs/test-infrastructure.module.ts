import { Module, Provider } from '@nestjs/common'
import { GraphqlModule } from '../../infrastructure'
import { TestDatabaseModule } from '../../infrastructure/persistence/typeorm/TestDatabaseModule'

const providers: Array<Provider> = []

@Module({
  imports: [TestDatabaseModule, GraphqlModule],
  providers,
})
export class TestInfrastructureModule {}
