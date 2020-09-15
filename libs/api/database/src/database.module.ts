import { Module } from '@nestjs/common'
import { databaseProviders } from './database.providers'
import { ApiConfigModule } from '@codelab/api-config'

@Module({
  imports: [ApiConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
