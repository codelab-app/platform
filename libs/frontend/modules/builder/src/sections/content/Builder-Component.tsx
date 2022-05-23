import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import {
  IComponentService,
  IElementTree,
  IRenderer,
  IRenderService,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { JSXElementConstructor } from 'react'

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
}

/**
 * Since the component builder tree changes based on which component id is active, we move the component id dependency to a wrapper we create for the main Builder
 */
export const BuilderComponent = observer<BuilderComponentProps>(
  ({ componentId, componentService, renderService, BaseBuilder }) => {
    if (!componentId) {
      return null
    }

    const [, { isLoading, error, data }] = useStatefulExecutor(
      async () => {
        const component = await componentService.getOne(componentId)

        if (!component) {
          throw new Error('Component not found')
        }

        const componentTree = component.elementTree

        const renderer = await renderService.addRenderer(
          componentId,
          componentTree,
          null,
          null,
        )

        return {
          componentTree,
          renderer,
        }
      },
      {
        executeOnMount: true,
      },
    )

    return (
      <>
        {data?.componentTree ? (
          <BaseBuilder
            elementTree={data?.componentTree}
            renderer={data.renderer}
          />
        ) : null}
      </>
    )
  },
)
