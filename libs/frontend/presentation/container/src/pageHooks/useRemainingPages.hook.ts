import { RendererType } from '@codelab/frontend/abstract/core'
import { useAsync } from '@react-hookz/web'
import { useStore } from '../providers'
import { useCurrentAppId } from '../routerHooks'

/**
 * Fetch and load the remaining app pages (that currently were not loaded from server)
 */
export const useRemainingPages = () => {
  const { appService, builderRenderService } = useStore()
  const appId = useCurrentAppId()
  const app = appService.app(appId)

  return useAsync(async () => {
    if (!app?.pages) {
      return
    }

    const notAlreadyLoadedPages = app.pages
      .map((page) => page.current.id)
      .map((id) => ({ NOT: { id } }))

    await appService.getAppPages(appId, {
      AND: notAlreadyLoadedPages,
    })

    app.pages.forEach((pageRef) => {
      const page = pageRef.current
      const rendererExists = builderRenderService.renderers.has(page.id)

      if (!rendererExists) {
        builderRenderService.addRenderer({
          elementTree: page,
          id: page.id,
          providerTree: app.providerPage,
          rendererType: RendererType.PageBuilder,
        })
      }
    })
  })
}
