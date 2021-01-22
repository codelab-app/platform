import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphqlModule } from '../../infrastructure'
import { PrismaGlobalModule } from '../../infrastructure/persistence/prisma/PrismaGlobalModule'
import { TestDatabaseModule } from '../../infrastructure/persistence/typeorm/TestDatabaseModule'
import { TypeOrmApp } from '../../infrastructure/persistence/typeorm/entity/TypeOrmApp'
import { TypeOrmEdge } from '../../infrastructure/persistence/typeorm/entity/TypeOrmEdge'
import { TypeOrmGraph } from '../../infrastructure/persistence/typeorm/entity/TypeOrmGraph'
import { TypeOrmPage } from '../../infrastructure/persistence/typeorm/entity/TypeOrmPage'
import { TypeOrmUser } from '../../infrastructure/persistence/typeorm/entity/TypeOrmUser'
import { TypeOrmVertex } from '../../infrastructure/persistence/typeorm/entity/TypeOrmVertex'

const providers: Array<Provider> = []

@Module({
  imports: [
    PrismaGlobalModule,
    TestDatabaseModule,
    GraphqlModule,
    TypeOrmModule.forFeature([
      TypeOrmUser,
      TypeOrmApp,
      TypeOrmGraph,
      TypeOrmEdge,
      TypeOrmVertex,
      TypeOrmPage,
    ]),
  ],
  providers,
})
export class TestInfrastructureModule {}
