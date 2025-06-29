import { SharedDomainModule } from '@codelab/backend-domain-shared-modules'
import { Module } from '@nestjs/common'

import { TagRepository } from './repository'

@Module({
  exports: [TagRepository],
  imports: [SharedDomainModule],
  providers: [TagRepository],
})
export class TagDomainModule {}
