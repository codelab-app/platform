import { Module, OnApplicationBootstrap, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked'
import { GraphqlConfig, TestDatabaseConfig } from '../../infrastructure'

const providers: Array<Provider> = []

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: TestDatabaseConfig.DB_HOST,
      port: TestDatabaseConfig.DB_PORT,
      username: TestDatabaseConfig.DB_USERNAME,
      password: TestDatabaseConfig.DB_PASSWORD,
      database: TestDatabaseConfig.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
      logging: ['query', 'error', 'schema'],
      extra: {
        connectionLimit: 5,
      },
      namingStrategy: new SnakeNamingStrategy(),
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphqlConfig,
    }),
  ],
  providers,
})
export class TestInfrastructureModule implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    initializeTransactionalContext()
  }
}
