import {
  IBuilderService,
  IComponentService,
  IElementService,
  IRenderService,
  IStore,
} from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { JSXElementConstructor, useEffect } from 'react'
import { BaseBuilderProps } from './BaseBuilder'

interface BuilderComponentProps {
  componentId: string
  componentService: IComponentService
  appStore: IStore
  // Pass in BaseBuilder so we don't have to initialize props again
  BaseBuilder: JSXElementConstructor<BaseBuilderProps>
  renderService: IRenderService
  builderService: IBuilderService
  elementService: IElementService
}

/**
 * Since the component builder tree changes based on which component id is active, we move the component id dependency to a wrapper we create for the main Builder
 */
export const BuilderComponent = observer<BuilderComponentProps>(
  ({
    componentId,
    componentService,
    builderService,
    renderService,
    appStore,
    elementService,
    BaseBuilder,
  }) => {
    const activeComponentTree = builderService.activeElementTree

    useEffect(() => {
      void (async () => {
        const component = await componentService.getOne(componentId)

        if (!component) {
          throw new Error('Component not found')
        }

        const componentTree = component.elementTree

        await renderService.addRenderer({
          id: componentId,
          pageTree: componentTree,
          appTree: null,
          components: componentService.componentList,
          appStore,
          isBuilder: true,
        })
      })()
    }, [componentId])

    const renderer = renderService.renderers.get(componentId)

    if (!activeComponentTree || !renderer) {
      return null
    }

    return (
      <BaseBuilder
        builderService={builderService}
        elementService={elementService}
        elementTree={activeComponentTree}
        renderer={renderer}
      />
    )
  },
)
