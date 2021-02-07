import React from 'react'
import { elementParameterFactory } from './elementFactory'
import { PaneConfigHandlersProps } from 'apps/web/src/builder/pane-config/Pane-config--handlers'
import { NodeA } from 'libs/modules/graph/src/core/domain/node/Node'

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
        {RenderChildren(child, props, handlers)}
      </Child>
    )
  })
