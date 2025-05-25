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
import { v4 } from 'uuid'

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
    useEffect(() => {
      const renderer = rendererService.hydrate({
        containerNode,
        id: v4(),
        rendererType,
      })

      // tracker.useEvent({
      //   componentName: 'BuilderProvider',
      //   event: 'Set active renderer',
      // })
      rendererService.setActiveRenderer(rendererRef(renderer.id))

      const runtimeContainer =
        renderer.runtimeContainerNode ?? renderer.runtimeRootContainerNode

      const runtimeRootElement = runtimeContainer.runtimeRootElement

      // tracker.useEvent({
      //   componentName: 'BuilderProvider',
      //   event: 'Set selected node',
      // })

      /**
       * Had a bug where the selected node would reset to the body for no reason.
       *
       * Turns out some issue with server action will re-run the component, which is re-running this component
       */
      if (
        !builderService.selectedNode ||
        builderService.activeContainer?.current.id !== containerNode.id
      ) {
        builderService.setSelectedNode(runtimeElementRef(runtimeRootElement))
      }

      void renderer.expressionTransformer.init()
    }, [rendererType, containerNode.id])

    return (
      <BuilderContext.Provider value={{ containerNode, rendererType }}>
        {children}
      </BuilderContext.Provider>
    )
  },
)
