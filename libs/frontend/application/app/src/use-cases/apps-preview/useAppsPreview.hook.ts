import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { useGetAppsPreviewQuery } from './apps-preview.tan.tan.gen'
import type { AppWhere } from '@codelab/shared/abstract/codegen'

export const useAppsPreview = () => {
  const { appService, domainService, pageService, userService } = useStore()
  const user = userService.user

  const { data } = useGetAppsPreviewQuery(
    {
      endpoint: '',
    },
    {
      where: {
        owner: {
          id: user.id,
        },
      },
    },
  )

  if (!data) {
    return null
  }

  const { atoms, apps } = data

  apps
    .flatMap((app) => app.pages)
    .forEach((page) => {
      pageService.pageDomainService.hydrate(page)
    })

  apps
    .flatMap((app) => app.domains)
    .forEach((domain) => {
      domainService.hydrate(domain)
    })

  return apps.map((app) => appService.appDomainService.hydrate(app))
}
