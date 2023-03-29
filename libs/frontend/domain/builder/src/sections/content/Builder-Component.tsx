import type { IStore } from '@codelab/frontend/abstract/core'
import { RendererType } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import { observer } from 'mobx-react-lite'
import type { JSXElementConstructor } from 'react'
import React, { useEffect } from 'react'
import type { BaseBuilderProps } from './BaseBuilder'

interface BuilderComponentProps {
  // Pass in BaseBuilder so we don't have to initialize props again
  BaseBuilder: JSXElementConstructor<BaseBuilderProps>
  appStore: IStore
  componentId: string
}

/**
 * Since the component builder tree changes based on which component id is active, we move the component id dependency to a wrapper we create for the main Builder
 */
export const BuilderComponent = observer<BuilderComponentProps>(
  ({ appStore, BaseBuilder, componentId }) => {
    const { builderRenderService, builderService, componentService } =
      useStore()

    const activeComponentTree = builderService.activeElementTree

    useEffect(() => {
      void (async () => {
        const component = await componentService.getOne(componentId)

        if (!component) {
          throw new Error('Component not found')
        }

        await builderRenderService.addRenderer({
          elementTree: component,
          id: componentId,
          providerTree: null,
          rendererType: RendererType.ComponentBuilder,
        })
      })()
    }, [componentId])

    const renderer = builderRenderService.renderers.get(componentId)

    if (!activeComponentTree || !renderer) {
      return null
    }

    return <BaseBuilder elementTree={activeComponentTree} renderer={renderer} />
  },
)
