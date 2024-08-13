import { useDomainStore } from '@codelab/frontend-infra-mobx/context'

export const useSelectAppOptions = () => {
  const { appDomainService } = useDomainStore()

  return appDomainService.appsList.map((app) => ({
    label: app.name,
    value: app.id,
  }))
}
