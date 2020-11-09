import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrmService } from './orm.service'
import { ConfigModule } from '@codelab/api/providers/config'

const resetDb = false

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: OrmService,
    }),
  ],
})
export class OrmModule {}
