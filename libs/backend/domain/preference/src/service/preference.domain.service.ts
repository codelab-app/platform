import { IBreakpointType, IPreferenceDto } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { PreferenceRepository } from '../repository'

@Injectable()
export class PreferenceDomainService {
  constructor(private preferenceRepository: PreferenceRepository) {}

  async createInitialPreference({ owner }: Pick<IPreferenceDto, 'owner'>) {
    return this.preferenceRepository.add({
      builderBreakpointType: IBreakpointType.None,
      builderWidth: -1,
      id: v4(),
      owner,
    })
  }
}
