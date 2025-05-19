'use client'

import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'

import {
  rendererRef,
  type RendererType,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { createContext, type ReactNode, useEffect } from 'react'
import { useAsync } from 'react-use'

interface BuilderContextProps {
  containerNode: IComponentModel | IPageModel
  rendererType: RendererType
}

interface BuilderProviderProps extends BuilderContextProps {
  children: ReactNode
}

const BuilderContext = createContext<BuilderContextProps | null>(null)

/**
 * Treating this as a way to block rendering until these data are initialized, we don't provide any data here
 *
 * 1) Hydrate and set active renderer
 * 2) Set selected node
 * 3) Initialize expression transformer
 */
export const BuilderProvider = observer(
  ({ children, containerNode, rendererType }: BuilderProviderProps) => {
    const { builderService, rendererService } = useApplicationStore()

    /**
     * Defer side effect to lifecycle method, to prevent https://github.com/codelab-app/platform/issues/3463
     */
    const { error, loading, value } = useAsync(async () => {
      await rendererService.expressionTransformer.init()
    }, [])

    useEffect(() => {
      if (loading) {
        return
      }

      if (error) {
        throw new Error(error.message)
      }

      const renderer = rendererService.hydrate({
        containerNode,
        // we want id to be related to containerNode, so that we can use it to find the renderer
        // we can't use containerNode.id only because it causes ref reslove issues
        // besides we want to create a diffrerent renderer for each rendererType
        id: `${containerNode.id}${rendererType}`,
        rendererType,
      })

      rendererService.setActiveRenderer(rendererRef(renderer.id))

      renderer.render()

      // tracker.useEvent({
      //   componentName: 'BuilderProvider',
      //   event: 'Set active renderer',
      // })

      const { runtimeContainerNode } = renderer
      const runtimeRootElement = runtimeContainerNode.runtimeRootElement.current

      // tracker.useEvent({
      //   componentName: 'BuilderProvider',
      //   event: 'Set selected node',
      // })

      /**
       * Had a bug where the selected node would reset to the body for no reason.
       *
       * Turns out some issue with server action will re-run the component, which is re-running this component
       */
      if (!builderService.selectedNode) {
        builderService.setSelectedNode(runtimeElementRef(runtimeRootElement))
      }
    }, [rendererType, containerNode.id, loading, error])

    return (
      !loading && (
        <BuilderContext.Provider value={{ containerNode, rendererType }}>
          {children}
        </BuilderContext.Provider>
      )
    )
  },
)
