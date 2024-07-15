import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'

export const useSelectAppOptions = () => {
  const { appDomainService } = useDomainStore()

  return appDomainService.appsList.map((app) => ({
    label: app.name,
    value: app.id,
  }))
}
