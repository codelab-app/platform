import type { IPreferenceService } from '@codelab/frontend-abstract-application'
import type { IUpdatePreferenceData } from '@codelab/frontend-abstract-domain'

import { preferenceRepository } from '@codelab/frontend-domain-preference/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'

export const usePreferenceService = (): IPreferenceService => {
  const { userDomainService } = useDomainStore()

  const update = async ({
    activeConfigPaneTab,
    builderBreakpointType,
    builderWidth,
  }: IUpdatePreferenceData) => {
    const preference = userDomainService.preference

    preference.writeCache({
      activeConfigPaneTab,
      builderBreakpointType,
      builderWidth,
    })

    await preferenceRepository.update({ id: preference.id }, preference)

    return preference
  }

  return { update }
}
