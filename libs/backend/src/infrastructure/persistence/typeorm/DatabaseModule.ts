import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { DatabaseConfig } from '../config/DatabaseConfig'
import { TypeOrmVertex } from './entity'
import { TypeOrmUser } from './entity/TypeOrmUser'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: DatabaseConfig.DB_HOST,
      port: DatabaseConfig.DB_PORT,
      username: DatabaseConfig.DB_USERNAME,
      password: DatabaseConfig.DB_PASSWORD,
      database: DatabaseConfig.DB_NAME,
      entities: [TypeOrmUser, TypeOrmVertex],
      autoLoadEntities: false,
      synchronize: DatabaseConfig.TYPEORM_SYNCHRONIZE,
      dropSchema: DatabaseConfig.TYPEORM_DROP_SCHEMA,
      logging: ['query', 'error', 'schema'],
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
})
export class DatabaseModule {}
