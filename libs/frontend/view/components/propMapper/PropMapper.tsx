import {
  PropMapperFunction,
  RenderProvider,
  useRenderContext,
} from '@codelab/frontend/presenter/container'
import React, { useCallback, useEffect, useState } from 'react'
import { applyBindings, PropMapperBinding } from './PropMapperBinding'

export interface PropMapperProps {
  bindings: Array<PropMapperBinding>
}

// Creates a map of bindings by elementId
const bindingsListToMap = (bindings: Array<PropMapperBinding>) =>
  bindings.reduce<Record<string, Array<PropMapperBinding>>>((acc, binding) => {
    if (!acc[binding.targetElement]) {
      acc[binding.targetElement] = [binding]
    } else {
      acc[binding.targetElement].push(binding)
    }

    return acc
  }, {})

export const PropMapper = ({
  bindings,
  children,
  ...props
}: React.PropsWithChildren<PropMapperProps>) => {
  const renderContext = useRenderContext()

  // Keep the bindings in a map by element id, because we don't want to do a
  // .filter for each and every element that's rendered
  const [bindingsByElementId, setBindingsByElementId] = useState(
    bindingsListToMap(bindings || []),
  )

  useEffect(() => {
    // Update bindings map when needed
    setBindingsByElementId(bindingsListToMap(bindings || []))
  }, [bindings])

  const propsMapper: PropMapperFunction = useCallback(
    (elementProps, node) => {
      // if any of our bindings match the element id, apply the mapping
      const elementBindings = bindingsByElementId[node.id]

      if (elementBindings) {
        return applyBindings(props, elementProps, elementBindings)
      }

      return elementProps
    },
    [bindingsByElementId, props],
  )

  const existingMappers = renderContext.nodePropsMappers || []

  return (
    <RenderProvider
      context={{
        ...renderContext,
        nodePropsMappers: [...existingMappers, propsMapper],
      }}
    >
      {children}
    </RenderProvider>
  )
}

PropMapper.displayName = 'PropMapper'
