import React, { useEffect, useRef } from 'react'
import { useDrop } from 'react-dnd'
import { DROP_OVERLAY_ID } from './Overlay-drop'
import { elementParameterFactory } from './elementFactory'
import { DragAndDropTypes, useOverlayToolbar } from '@codelab/frontend'
import { PaneConfigHandlersProps } from 'apps/web/src/builder/pane-config/Pane-config--handlers'
import { NodeA } from 'libs/modules/graph/src/core/domain/node/Node'

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
  renderProps: object,
  handlers: PaneConfigHandlersProps,
) =>
  node.children.map((child: NodeA) => {
    const [Child, props] = elementParameterFactory({
      node: child,
      handlers,
    })

    return (
      <Child key={child.id} {...props} className="Builder-node">
        <DropHandler node={child} handlers={handlers} />
        {RenderChildren(child, props, handlers)}
      </Child>
    )
  })
