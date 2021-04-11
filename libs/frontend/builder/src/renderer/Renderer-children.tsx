import React from 'react'
import { useDrop } from 'react-dnd'
import { elementParameterFactory } from './elementFactory'
import { DragAndDropTypes, NodeA } from '@codelab/frontend/shared'
import { useAddNodeToElementMapping } from './nodeToElementMapState'
import { ComponentHandlers } from './useComponentHandlers'

// The drop handler is a separate component, because
// we don't want to mess with the actual child. We don't know a lot about it, for example
// if it can handle refs.
const DropHandler = React.forwardRef<
  HTMLElement,
  {
    node: NodeA
    handlers: ComponentHandlers
  }
>(({ node, handlers }, ref) => {
  const [{ isOver }, dropRef] = useDrop<any, any, any>({
    accept: DragAndDropTypes.Component,
    collect: (m) => ({
      isOver: m.isOver(),
    }),
    drop: (d) => {
      if (d?.node?.type) {
        return handlers.addChildVertex({
          parentVertexId: node.id,
          vertex: {
            type: d.node.type,
          },
        })
      }
    },
  })

  return (
    <>
      <div ref={ref as any} style={{ position: 'absolute', inset: 0 }} />
      <div ref={dropRef} style={{ position: 'absolute', inset: 0 }} />
    </>
  )
})

export const RenderChildren = (
  node: NodeA,
  renderProps: Record<string, unknown>,
  handlers: ComponentHandlers,
) => {
  const { createMappingRef } = useAddNodeToElementMapping()

  const renderedChildren = node.children.map((child: NodeA) => {
    const [Child, props] = elementParameterFactory({
      node: child,
      handlers,
    })

    if (!Child) return null

    return (
      <Child key={child.id} {...props} className="Builder-node">
        <DropHandler
          ref={createMappingRef(child)}
          node={child}
          handlers={handlers}
        />
        {RenderChildren(child, {}, handlers)}
      </Child>
    )
  })

  return renderedChildren.length === 1 ? renderedChildren[0] : renderedChildren
}
