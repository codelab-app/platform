import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'
import { AppRepository } from './repository'

@Module({
  exports: [AppRepository],
  imports: [SharedDomainModule],
  providers: [AppRepository],
})
export class AppDomainModule {}
