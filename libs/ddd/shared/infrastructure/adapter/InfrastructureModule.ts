import { Module, OnApplicationBootstrap, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked'
import { DatabaseConfig } from '../config/DatabaseConfig'
import { GraphqlConfig } from '../config/GraphqlConfig'

const providers: Array<Provider> = []

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: DatabaseConfig.DB_HOST,
      port: DatabaseConfig.DB_PORT,
      username: DatabaseConfig.DB_USERNAME,
      password: DatabaseConfig.DB_PASSWORD,
      database: DatabaseConfig.DB_NAME,
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
export class InfrastructureModule implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    initializeTransactionalContext()
  }
}
