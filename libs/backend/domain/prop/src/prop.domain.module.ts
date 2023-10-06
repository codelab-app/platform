import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'
import { PropRepository } from './repository'

@Module({
  exports: [PropRepository],
  imports: [SharedDomainModule],
  providers: [PropRepository],
})
export class PropDomainModule {}
