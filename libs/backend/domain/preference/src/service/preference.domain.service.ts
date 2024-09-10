import { IPreferenceDto } from '@codelab/shared/abstract/core'
import { breakpoints, DEFAULT_BUILDER_BREAKPOINT } from '@codelab/shared/domain'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { PreferenceRepository } from '../repository'

@Injectable()
export class PreferenceDomainService {
  constructor(private preferenceRepository: PreferenceRepository) {}

  async createInitialPreference({ owner }: Pick<IPreferenceDto, 'owner'>) {
    return this.preferenceRepository.save(
      {
        builderBreakpointType: DEFAULT_BUILDER_BREAKPOINT,
        builderWidth: breakpoints[DEFAULT_BUILDER_BREAKPOINT].default,
        id: v4(),
        owner,
      },
      { owner },
    )
  }
}
