import React, { useEffect, useState } from 'react'
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
  // Keep the bindings in a map by element id, because we don't want to do a
  // .filter for each and every element that's rendered
  const [bindingsByElementId, setBindingsByElementId] = useState(
    bindingsListToMap(bindings || []),
  )

  useEffect(() => {
    // Update bindings map when needed
    setBindingsByElementId(bindingsListToMap(bindings || []))
  }, [bindings])

  const recursiveMap = (nodeChildren: React.ReactNode) => {
    return React.Children.map(nodeChildren, (child) => {
      if (!React.isValidElement(child)) {
        return child
      }

      let childProps = {
        ...child.props,
        key: child.props.nodeid,
      }

      // Check if has nodeId
      if (child.props.nodeid) {
        const elementBindings = bindingsByElementId[child.props.nodeid]

        if (elementBindings) {
          childProps = applyBindings(props, childProps, elementBindings)
        }
      }

      childProps.children = recursiveMap(child.props.children)

      return React.cloneElement(child, childProps)
    })
  }

  return <>{recursiveMap(children)}</>
}

PropMapper.displayName = 'PropMapper'
