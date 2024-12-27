import { IPreferenceDto } from '@codelab/shared/abstract/core'
import {
  breakpoints,
  DEFAULT_BUILDER_BREAKPOINT,
} from '@codelab/shared/config/builder'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

import { PreferenceRepository } from '../repository'

@Injectable()
export class PreferenceDomainService {
  constructor(private preferenceRepository: PreferenceRepository) {}

  async createInitialPreference({ owner }: Pick<IPreferenceDto, 'owner'>) {
    const existing = await this.preferenceRepository.findOne({
      where: {
        owner: {
          id: owner.id,
        },
      },
    })

    return existing
      ? existing
      : this.preferenceRepository.add({
          builderBreakpointType: DEFAULT_BUILDER_BREAKPOINT,
          builderWidth: breakpoints[DEFAULT_BUILDER_BREAKPOINT].default,
          id: v4(),
          owner,
        })
  }
}
