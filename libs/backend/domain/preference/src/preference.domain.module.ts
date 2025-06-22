import { SharedDomainModule } from '@codelab/backend-domain-shared-modules'
import { Module } from '@nestjs/common'

import { PreferenceRepository } from './repository'

@Module({
  exports: [PreferenceRepository],
  imports: [SharedDomainModule],
  providers: [PreferenceRepository],
})
export class PreferenceDomainModule {}
