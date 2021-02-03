import React, { ReactNode } from 'react'
import { useRecoilState } from 'recoil'
import { dashboardDrawerState } from '../../../../apps/web/src/dashboard/drawer/Dashboard-drawer'
import { DashboardHandlerProps } from '../../../../apps/web/src/dashboard/drawer/Dashboard-handlers'
import { NodeA, NodeI } from '../../../modules/graph/src/core/domain/node/Node'
import { elementParameterFactory } from './elementFactory'
import { useUpdateVertexMutation } from '@codelab/generated'

const hasChildren = (node: NodeI) => {
  return !!node.children?.length
}

export const RenderChildren = (
  node: NodeA,
  renderProps: object = {},
  handlers: DashboardHandlerProps,
): ReactNode | Array<ReactNode> => {
  return node.children.map((child: NodeA) => {
    // TODO: remove any cast
    const [Child, props] = elementParameterFactory({
      ...child,
      handlers,
    }) as any

    return (
      <Child key={child.id} {...props} className="Builder-node">
        {hasChildren(child)
          ? RenderChildren(
              child,
              props,
              handlers,
              // child.nextRenderProps(oldRenderProps)
            )
          : null}
      </Child>
    )
  })
}

export const RenderComponents = (node: NodeA) => {
  const [dashboardDrawer, setDashboardDrawer] = useRecoilState(
    dashboardDrawerState,
  )
  const updateVertexMutation = useUpdateVertexMutation()
  const { type } = node
  const handlers: DashboardHandlerProps = {
    setDashboardDrawer,
    updateVertexMutation,
  }
  const [RootComponent, props] = elementParameterFactory({
    type,
    props: node.props,
    handlers,
  }) as any

  return (
    <RootComponent {...props}>
      {RenderChildren(node, {}, handlers)}
    </RootComponent>
  )
}
