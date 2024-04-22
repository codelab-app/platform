import {
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type { IAppProductionDto } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { useAsync } from '@react-hookz/web'
import { useRouter } from 'next/router'

/**
 * Fetch related data for rendering page, and load them into store
 */
export const useAppProduction = (appProductionData: IAppProductionDto) => {
  const { appService, rendererService } = useStore()
  const { appName, pageName } = appProductionData
  const router = useRouter()

  return useAsync(async () => {
    console.debug('useAppProduction', { appName, pageName })

    const app = await appService.appProductionService.hydrateAppProductionData(
      appProductionData,
    )

    const page = app.pageByName(pageName)

    const renderer = rendererService.hydrate({
      containerNode: page,
      id: page.id,
      rendererType: RendererType.Production,
    })

    console.debug(renderer)

    rendererService.setActiveRenderer(rendererRef(renderer.id))
    await renderer.expressionTransformer.init()

    return {
      app,
      elementTree: page,
      page,
      renderer,
    }
  })
}
