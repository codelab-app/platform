import { PropDomainModule } from '@codelab/backend/domain/prop'
import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'

import {
  ActionFactory,
  ApiActionRepository,
  CodeActionRepository,
} from './repository'

@Module({
  exports: [ActionFactory, ApiActionRepository, CodeActionRepository],
  imports: [SharedDomainModule, PropDomainModule],
  providers: [ActionFactory, ApiActionRepository, CodeActionRepository],
})
export class ActionDomainModule {}
