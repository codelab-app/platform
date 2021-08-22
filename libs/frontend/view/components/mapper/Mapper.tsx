import { useRenderContext } from '@codelab/frontend/presenter/container'
import React from 'react'

export interface MapperProps<T> {
  data: Array<T>
  /** The id of the component to be rendered */
  component: string
}

/**
 * Maps the input data and instantiates a Component for each item in the data prop array
 * Each array item is passed as props to its component instance
 */
export const Mapper = <T extends Record<string, any>>({
  component,
  data,
}: MapperProps<T>) => {
  const context = useRenderContext()

  if (!context) {
    throw new Error('The Mapper component requires a RenderContext')
  }

  const componentNode = context.tree.getComponentById(component)

  if (componentNode) {
    const renderedComponent = context.renderFactory(componentNode, context)

    return (
      <>
        {data?.map((item, index) =>
          React.cloneElement(renderedComponent, {
            ...item,
            key: `${componentNode.id}-${index}`,
          }),
        )}
      </>
    )
  }

  return null
}

Mapper.displayName = 'Mapper'
