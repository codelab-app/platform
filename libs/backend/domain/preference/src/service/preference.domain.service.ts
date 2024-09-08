import { IBreakpointType, IPreferenceDto } from '@codelab/shared/abstract/core'
import { breakpoints } from '@codelab/shared/domain'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { PreferenceRepository } from '../repository'

@Injectable()
export class PreferenceDomainService {
  constructor(private preferenceRepository: PreferenceRepository) {}

  async createInitialPreference({ owner }: Pick<IPreferenceDto, 'owner'>) {
    return this.preferenceRepository.save(
      {
        builderBreakpointType: IBreakpointType.Desktop,
        builderWidth: breakpoints[IBreakpointType.Desktop].default,
        id: v4(),
        owner,
      },
      { owner },
    )
  }
}
