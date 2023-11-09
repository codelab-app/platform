import { RendererType } from '@codelab/frontend/abstract/application'
import { useStore } from '@codelab/frontend/application/shared/store'
import { useAsync } from '@react-hookz/web'
import { useCurrentApp } from '../routerHooks'

/**
 * Fetch and load the remaining app pages (that currently were not loaded from server)
 */
export const useRemainingPages = () => {
  const { pageService, rendererService } = useStore()
  const app = useCurrentApp()

  return useAsync(async () => {
    if (!app?.pages) {
      return
    }

    const notAlreadyLoadedPages = app.pages.map((page) => page.id)

    await pageService.getAll({
      AND: [
        { appConnection: { node: { id: app.id } } },
        { NOT: { id_IN: notAlreadyLoadedPages } },
      ],
    })

    app.pages.forEach((page) => {
      const rendererExists = rendererService.renderers.has(page.id)

      if (!rendererExists) {
        rendererService.hydrate({
          elementTree: page,
          id: page.id,
          rendererType: RendererType.PageBuilder,
        })
      }
    })
  })
}
