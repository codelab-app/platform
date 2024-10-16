import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { Module } from '@nestjs/common'

import { PreferenceRepository } from './repository'
import { PreferenceDomainService } from './service'

@Module({
  exports: [PreferenceRepository, PreferenceDomainService],
  imports: [SharedDomainModule],
  providers: [PreferenceRepository, PreferenceDomainService],
})
export class PreferenceDomainModule {}
