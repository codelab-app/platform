import type { RendererType } from '@codelab/frontend/abstract/application'
import { rendererRef } from '@codelab/frontend/abstract/application'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  useAppQuery,
  usePageQuery,
} from '@codelab/frontend/presentation/container'
import { useAsync } from '@react-hookz/web'
import { useRouter } from 'next/navigation'

interface DevelopmentPageProps {
  rendererType: RendererType
}

/**
 * Fetch related data for rendering page, and load them into store
 */
export const useAppDevelopment = ({ rendererType }: DevelopmentPageProps) => {
  const { appService, builderService, rendererService, userService } =
    useStore()

  const router = useRouter()
  const { appName } = useAppQuery()
  const { pageName } = usePageQuery()
  const userId = userService.user.id

  return useAsync(async () => {
    try {
      const appDevelopmentData =
        await appService.appDevelopmentService.getAppDevelopmentData({
          appName,
          pageName,
          userId,
        })

      const app =
        await appService.appDevelopmentService.hydrateAppDevelopmentData(
          appDevelopmentData,
        )

      const page = app.pageByName(pageName)

      const renderer = rendererService.hydrate({
        containerNode: page,
        id: page.id,
        rendererType,
      })

      rendererService.setActiveRenderer(rendererRef(renderer.id))
      builderService.selectElementNode(
        renderer.runtimeRootContainerNode.runtimeRootElement,
      )

      await renderer.expressionTransformer.init()

      return {
        app,
        elementTree: page,
        page,
        renderer,
      }
    } catch (error) {
      console.error(error)

      await router.push(PageType.AppList)
    }
  })
}
