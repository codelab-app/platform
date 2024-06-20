import { useStore } from '@codelab/frontend-application-shared-store/provider'

export const useAppsPreview = () => {
  // const { appService, domainService, pageService, userService } = useStore()
  // const user = userService.user
  // const { data } = useGetAppsPreviewQuery({
  //   where: {
  //     owner: {
  //       id: user.id,
  //     },
  //   },
  // })
  // if (!data) {
  //   return null
  // }
  // const { apps, atoms } = data
  // apps
  //   .flatMap((app) => app.pages)
  //   .forEach((page) => {
  //     pageService.pageDomainService.hydrate(page)
  //   })
  // apps
  //   .flatMap((app) => app.domains)
  //   .forEach((domain) => {
  //     domainService.hydrate(domain)
  //   })
  // return apps.map((app) => appService.appDomainService.hydrate(app))
}
