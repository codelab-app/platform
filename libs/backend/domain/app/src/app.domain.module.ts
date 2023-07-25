import { Module } from '@nestjs/common'
import { AppRepository } from './repository'

@Module({
  exports: [AppRepository],
  providers: [AppRepository],
})
export class AppDomainModule {}
