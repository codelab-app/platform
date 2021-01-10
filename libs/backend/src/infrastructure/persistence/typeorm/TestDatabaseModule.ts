import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { TestDatabaseConfig } from '../config/TestDatabaseConfig'
import { TypeOrmApp } from './entity/TypeOrmApp'
import { TypeOrmEdge } from './entity/TypeOrmEdge'
import { TypeOrmGraph } from './entity/TypeOrmGraph'
import { TypeOrmPage } from './entity/TypeOrmPage'
import { TypeOrmUser } from './entity/TypeOrmUser'
import { TypeOrmVertex } from './entity/TypeOrmVertex'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOrmEdge,
      TypeOrmGraph,
      TypeOrmUser,
      TypeOrmVertex,
      TypeOrmPage,
      TypeOrmApp,
    ]),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: TestDatabaseConfig.DB_HOST,
      port: TestDatabaseConfig.DB_PORT,
      username: TestDatabaseConfig.DB_USERNAME,
      password: TestDatabaseConfig.DB_PASSWORD,
      database: TestDatabaseConfig.DB_NAME,
      entities: [
        TypeOrmEdge,
        TypeOrmGraph,
        TypeOrmUser,
        TypeOrmVertex,
        TypeOrmPage,
        TypeOrmApp,
      ],
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
      keepConnectionAlive: false,
      // logging: ['query', 'error', 'schema'],
      logging: ['error'],
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
})
export class TestDatabaseModule {}
