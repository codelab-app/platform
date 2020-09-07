import { ApiConfigModule } from '@codelab/api-config'
import { Module } from '@nestjs/common'
import { databaseProviders } from './database.providers'

@Module({
  imports: [ApiConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
