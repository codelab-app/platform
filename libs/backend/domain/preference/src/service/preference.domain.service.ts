import { IBreakpoint, IPreferenceDto } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { PreferenceRepository } from '../repository'

@Injectable()
export class PreferenceDomainService {
  constructor(private preferenceRepository: PreferenceRepository) {}

  async createInitialPreference({ owner }: Pick<IPreferenceDto, 'owner'>) {
    return this.preferenceRepository.add({
      builderBreakpoint: IBreakpoint.Desktop,
      builderWidth: 300,
      id: v4(),
      owner,
    })
  }
}
