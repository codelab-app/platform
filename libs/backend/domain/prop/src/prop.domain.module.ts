import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'
import { PropRepository } from './repository'
import { PropDomainService } from './service'

@Module({
  exports: [PropRepository, PropDomainService],
  imports: [SharedDomainModule],
  providers: [PropRepository, PropDomainService],
})
export class PropDomainModule {}
