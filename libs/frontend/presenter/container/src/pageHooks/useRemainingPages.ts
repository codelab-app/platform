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
  const app = appService.app(appId)!

  return useAsync(async () => {
    await appService.lazyGetRemainingPages(appId)

    await Promise.all([
      app.pages.map(async (pageRef) => {
        const page = pageRef.current
        const rendererExists = builderRenderService.renderers.has(page.id)

        if (!rendererExists) {
          await builderRenderService.addRenderer({
            elementTree: page,
            id: page.id,
            providerTree: app.providerPage,
            rendererType: RendererType.PageBuilder,
          })
        }
      }),
    ])
  })
}
