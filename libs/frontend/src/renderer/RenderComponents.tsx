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
  const children = node.children.reduce(
    (Components: Array<ReactNode>, child: NodeA) => {
      const [Child, props] = elementParameterFactory({
        ...child,
        handlers,
      })

      // TODO: remove any cast
      const ChildComponent: ReactNode = hasChildren(child)
        ? React.createElement(
            Child as any,
            {
              key: child.id,
              ...props,
              className: 'Builder-node',
              // ...child.evalProps(oldRenderProps)
            },
            RenderChildren(
              child,
              props,
              handlers,
              // child.nextRenderProps(oldRenderProps)
            ),
          )
        : React.createElement(Child as any, {
            key: child.id,
            ...props,
            className: 'Builder-node',
            // ...child.evalProps(oldRenderProps),
          })

      return [...Components, ChildComponent]
    },
    [],
  )

  return children
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
  })

  return (
    <>
      {React.createElement(
        RootComponent as any,
        props,
        RenderChildren(node, {}, handlers),
      )}
    </>
  )
}
