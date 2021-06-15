import {
  ComponentElementNode,
  DragAndDropTypes,
} from '@codelab/frontend/shared'
import React from 'react'
import { useDrop } from 'react-dnd'
import { atomElementFactory } from './elementFactory'
import { useAddNodeToElementMapping } from './nodeToElementMapState'
import { ComponentHandlers } from './useComponentHandlers'

// The drop handler is a separate component, because
// we don't want to mess with the actual child. We don't know a lot about it, for example
// if it can handle refs.
const DropHandler = React.forwardRef<
  HTMLElement,
  {
    node: ComponentElementNode
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

export const RenderChildren = ({
  node,
  handlers,
}: {
  node: ComponentElementNode
  handlers: ComponentHandlers
}) => {
  const { createMappingRef } = useAddNodeToElementMapping()

  const renderedChildren = node.children?.map((child: ComponentElementNode) => {
    const [Child, props] = atomElementFactory({
      node: child,
      handlers,
      atom: child.atom,
    })

    if (!Child) {
      return null
    }

    return (
      <Child {...props}>
        <DropHandler
          ref={createMappingRef(child)}
          node={child}
          handlers={handlers}
        />
        <RenderChildren node={child} handlers={handlers} />
      </Child>
    )
  })

  // Reason for any cast:
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356#issuecomment-336384210
  return renderedChildren?.length === 1
    ? renderedChildren[0]
    : (renderedChildren as any)
}
