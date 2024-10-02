import type { IPreferenceService } from '@codelab/frontend/abstract/application'
import type { IUpdatePreferenceData } from '@codelab/frontend/abstract/domain'

import { preferenceRepository } from '@codelab/frontend-domain-preference/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'

export const usePreferenceService = (): IPreferenceService => {
  const { preferenceDomainService } = useDomainStore()

  const update = async ({
    builderBreakpointType,
    builderWidth,
  }: IUpdatePreferenceData) => {
    const preference = preferenceDomainService.preference

    preference.writeCache({ builderBreakpointType, builderWidth })

    await preferenceRepository.update(preference)

    return preference
  }

  return { update }
}
