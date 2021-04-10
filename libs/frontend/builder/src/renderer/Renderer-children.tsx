import React, { useEffect, useRef } from 'react'
import { useDrop } from 'react-dnd'
import { useOverlayToolbar } from '../overlay-toolbar'
import { elementParameterFactory } from './elementFactory'
import {
  DragAndDropTypes,
  NodeA,
  PaneConfigHandlersProps,
} from '@codelab/frontend/shared'
import { DROP_OVERLAY_ID } from './Overlay-drop'

// The drop handler is a separate component, because
// we don't want to mess with the actual child. We don't know a lot about it, for example
// if it can handle refs.
const DropHandler = ({
  node,
  handlers,
}: {
  node: NodeA
  handlers: PaneConfigHandlersProps
}) => {
  const [{ isOver }, dropRef] = useDrop<any, any, any>({
    accept: DragAndDropTypes.Component,
    collect: (m) => ({
      isOver: m.isOver(),
    }),
    drop: (d) => {
      if (d?.node?.type) {
        handlers.addChildVertex({
          parentVertexId: node.id,
          vertex: {
            type: d.node.type,
          },
        })
      }
    },
  })

  const overlayElementRef = useRef<any>()

  const { show, reset, toolbarState } = useOverlayToolbar(DROP_OVERLAY_ID)

  useEffect(() => {
    if (
      isOver &&
      (!toolbarState?.metadata?.id || toolbarState?.metadata?.id !== node.id)
    ) {
      show(overlayElementRef.current, { id: node.id, type: node.type })
    } else if (
      !isOver &&
      toolbarState?.metadata?.id &&
      toolbarState.metadata.id === node.id
    ) {
      reset()
    }
  })

  return (
    <>
      <div ref={overlayElementRef} style={{ position: 'absolute', inset: 0 }} />
      <div ref={dropRef} style={{ position: 'absolute', inset: 0 }} />
    </>
  )
}

export const RenderChildren = (
  node: NodeA,
  renderProps: Record<string, unknown>,
  handlers: PaneConfigHandlersProps,
) => {
  const renderedChildren = node.children.map((child: NodeA) => {
    const [Child, props] = elementParameterFactory({
      node: child,
      handlers,
    })

    if (!Child) return null

    return (
      <Child key={child.id} {...props} className="Builder-node">
        <DropHandler node={child} handlers={handlers} />
        {RenderChildren(child, {}, handlers)}
      </Child>
    )
  })

  return renderedChildren.length === 1 ? renderedChildren[0] : renderedChildren
}
