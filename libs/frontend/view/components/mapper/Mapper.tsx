import { useRenderContext } from '@codelab/frontend/presenter/container'
import React from 'react'

export interface LoopProps<T> {
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
}: LoopProps<T>) => {
  const context = useRenderContext()

  if (!context) {
    throw new Error('The Mapper component requires a RenderContext')
  }

  const componentNode = context.tree.getComponentById(component)
  const renderedComponent = context.renderFactory(componentNode)

  if (!renderedComponent) {
    return null
  }

  return <>{data.map((item) => React.cloneElement(renderedComponent, item))}</>
}

Mapper.displayName = 'Mapper'
