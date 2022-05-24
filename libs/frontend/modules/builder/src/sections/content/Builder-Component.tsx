import {
  IBuilderService,
  IComponentService,
  IElementTree,
  IRenderer,
  IRenderService,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { JSXElementConstructor, useEffect } from 'react'

export type BaseBuilderProps = {
  elementTree: IElementTree
  renderer: IRenderer
}

type BuilderComponentProps = {
  componentId: string
  componentService: IComponentService
  // Pass in BaseBuilder so we don't have to initialize props again
  BaseBuilder: JSXElementConstructor<BaseBuilderProps>
  renderService: IRenderService
  builderService: IBuilderService
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
    BaseBuilder,
  }) => {
    const activeComponentTree = builderService.activeElementTree

    useEffect(() => {
      // eslint-disable-next-line padding-line-between-statements
      ;(async () => {
        const component = await componentService.getOne(componentId)

        if (!component) {
          throw new Error('Component not found')
        }

        const componentTree = component.elementTree

        await renderService.addRenderer(componentId, componentTree, null, null)
      })()
    }, [componentId])

    const renderer = renderService.renderers.get(componentId)

    return (
      <>
        {activeComponentTree && renderer ? (
          <BaseBuilder elementTree={activeComponentTree} renderer={renderer} />
        ) : null}
      </>
    )
  },
)
