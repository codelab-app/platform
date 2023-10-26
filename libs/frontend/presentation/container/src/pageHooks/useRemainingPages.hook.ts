import { RendererType } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { useAsync } from '@react-hookz/web'
import { useCurrentApp } from '../routerHooks'

/**
 * Fetch and load the remaining app pages (that currently were not loaded from server)
 */
export const useRemainingPages = () => {
  const { appService, rendererService } = useStore()
  const app = useCurrentApp()

  return useAsync(async () => {
    if (!app?.pages) {
      return
    }

    const notAlreadyLoadedPages = app.pages
      .map((page) => page.id)
      .map((id) => ({ NOT: { id } }))

    await appService.getAppPages(app.id, {
      AND: notAlreadyLoadedPages,
    })

    app.pages.forEach((page) => {
      const rendererExists = rendererService.renderers.has(page.id)

      if (!rendererExists) {
        rendererService.hydrate({
          elementTree: page.current,
          id: page.id,
          providerTree: app.providerPage,
          rendererType: RendererType.PageBuilder,
        })
      }
    })
  })
}
