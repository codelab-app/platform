import { Module } from '@nestjs/common'
import { databaseProviders } from './database.providers'
import { ConfigModule } from '@codelab/api/config'

@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
