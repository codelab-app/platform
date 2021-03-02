import { useNode } from '@craftjs/core'
import React from 'react'
import { elementParameterFactory } from './elementFactory'
import { PaneConfigHandlersProps } from 'apps/web/src/pages/builder/pane-config/Pane-config--handlers'
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
  const {
    connectors: { connect, drag },
  } = useNode()

  return (
    <>
      <div
        ref={(ref) => connect(drag(ref))}
        style={{ position: 'absolute', inset: 0 }}
      />
      {/* <div ref={dropRef} style={{ position: 'absolute', inset: 0 }} /> */}
    </>
  )
}

export const RenderChildren = (
  node: NodeA,
  renderProps: object,
  handlers: PaneConfigHandlersProps,
) => {
  // console.log(node.children)

  return node.children.map((child: NodeA) => {
    const [Child, props] = elementParameterFactory({
      node: child,
      handlers,
    })

    return (
      <Child key={child.id} {...props} className="Builder-node">
        {/* <DropHandler node={child} handlers={handlers} /> */}
        {RenderChildren(child, props, handlers)}
      </Child>
    )
  })
}
