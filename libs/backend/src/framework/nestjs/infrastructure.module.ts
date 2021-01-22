import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphqlModule } from '../../infrastructure/graphql/GraphqlModule'
import { PrismaGlobalModule } from '../../infrastructure/persistence/prisma/PrismaGlobalModule'
import { DatabaseModule } from '../../infrastructure/persistence/typeorm/DatabaseModule'
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
    DatabaseModule,
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
export class InfrastructureModule {}
