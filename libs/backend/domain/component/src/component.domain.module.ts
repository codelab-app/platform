import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'

import { ComponentRepository } from './repository'

@Module({
  exports: [ComponentRepository],
  imports: [SharedDomainModule],
  providers: [ComponentRepository],
})
export class ComponentDomainModule {}
