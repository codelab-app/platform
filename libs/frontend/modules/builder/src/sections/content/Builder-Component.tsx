import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import {
  IComponentService,
  IElementTree,
  IRenderService,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { JSXElementConstructor } from 'react'

export type BaseBuilderProps = {
  elementTree: IElementTree
  renderService: IRenderService
}

type BuilderComponentProps = {
  componentId: string
  componentService: IComponentService
  componentBuilderRenderService: IRenderService
  // Pass in BaseBuilder so we don't have to initialize props again
  BaseBuilder: JSXElementConstructor<BaseBuilderProps>
}

/**
 * Since the component builder tree changes based on which component id is active, we move the component id dependency to a wrapper we create for the main Builder
 */
export const BuilderComponent = observer<BuilderComponentProps>(
  ({
    componentId,
    componentService,
    componentBuilderRenderService,
    BaseBuilder,
  }) => {
    if (!componentId) {
      return null
    }

    const [, { isLoading, error, data }] = useStatefulExecutor(
      async () => {
        const component = await componentService.getOne(componentId)

        if (!component) {
          throw new Error('Component not found')
        }

        // Get element tree
        const componentTree = await componentService.elementTrees
          .get(component.id)
          ?.getTree(component.rootElementId)

        if (componentTree) {
          await componentBuilderRenderService.init(componentTree, null, null)
        }

        return {
          componentTree,
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
            renderService={componentBuilderRenderService}
          />
        ) : null}
      </>
    )
  },
)
