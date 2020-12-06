import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { TestDatabaseConfig } from '../../config/TestDatabaseConfig'

@Module({
  imports: [
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
  ],
})
export class TestTypeOrmModule {}
