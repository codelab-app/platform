import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { DatabaseConfig } from '../config/DatabaseConfig'
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
      host: DatabaseConfig.DB_HOST,
      port: DatabaseConfig.DB_PORT,
      username: DatabaseConfig.DB_USERNAME,
      password: DatabaseConfig.DB_PASSWORD,
      database: DatabaseConfig.DB_NAME,
      entities: [
        TypeOrmEdge,
        TypeOrmGraph,
        TypeOrmUser,
        TypeOrmVertex,
        TypeOrmPage,
        TypeOrmApp,
      ],
      autoLoadEntities: false,
      synchronize: DatabaseConfig.TYPEORM_SYNCHRONIZE,
      dropSchema: DatabaseConfig.TYPEORM_DROP_SCHEMA,
      // logging: ['query', 'error', 'schema'],
      logging: ['error'],
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
})
export class DatabaseModule {}
