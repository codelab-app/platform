import {
  RenderContext,
  useRenderContext,
} from '@codelab/frontend/presenter/container'
import React, { PropsWithChildren } from 'react'

export interface MapperProps<T> {
  data: Array<T>
  /**
   * The id of the component to be rendered
   * If no component is present, and there is only 1 child - it will render the child
   * */
  component?: string
}

const mappedElementFactory = (
  { component, children }: PropsWithChildren<MapperProps<any>>,
  context: RenderContext,
) => {
  if (component) {
    const componentNode = context.tree.getComponentById(component)

    if (componentNode) {
      return context.renderFactory(componentNode, context)
    }
  }

  while (Array.isArray(children) && children.length === 1) {
    children = children[0]
  }

  if (children && React.Children.count(children) === 1) {
    return children
  }

  return null
}

/**
 * Maps the input data and instantiates a Component for each item in the data prop array
 * Each array item is passed as props to its component instance
 */
export const Mapper = <T extends Record<string, any>>(
  props: PropsWithChildren<MapperProps<T>>,
) => {
  const { data } = props
  const context = useRenderContext()

  if (!context) {
    throw new Error('The Mapper component requires a RenderContext')
  }

  if (!data) {
    return null
  }

  const rendered = mappedElementFactory(props, context)

  if (!rendered) {
    return null
  }

  if (Array.isArray(data)) {
    return data?.map((item, index) => {
      const newRendered = React.cloneElement(rendered, {
        ...item,
        key: `${rendered.key}-${index}`,
      })

      if (context.onRendered) {
        context.onRendered(newRendered, (newRendered.props as any).__node)
      }

      return newRendered
    })
  }

  if (typeof data === 'object') {
    return React.cloneElement(rendered, data)
  }

  if (data) {
    console.warn('Unknown data passed to Mapper', data)
  }

  return null
}

Mapper.displayName = 'Mapper'
