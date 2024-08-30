import type { PropsWithChildren } from 'react'
import React, { useRef, useState } from 'react'
import { type ImperativePanelHandle, Panel } from 'react-resizable-panels'
import { CollapseControl, CuiResizeHandle } from '../components'

export type CuiResizablePanelProps = PropsWithChildren<{
  // Overrides the state
  collapsed?: boolean
  collapsible?: boolean
  order: number
  // can add support for top, buttom later on
  resizeDirection: 'left' | 'right'
  showCollapseButton?: boolean
}>

export const useResizeHandler = ({
  children,
  collapsible,
  order,
  resizeDirection,
  showCollapseButton = true,
}: CuiResizablePanelProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const panelHandler = useRef<ImperativePanelHandle>(null)
  const showCollapseControl = collapsible && (collapsed || showCollapseButton)

  return {
    collapseControl: showCollapseControl && (
      <CollapseControl
        collapsed={collapsed}
        onClick={() => {
          if (collapsed) {
            panelHandler.current?.expand()
          } else {
            panelHandler.current?.collapse()
          }
        }}
        resizeDirection={resizeDirection}
      />
    ),
    handler: <CuiResizeHandle />,
    panel: (
      <Panel
        collapsible={collapsible}
        onCollapse={() => {
          setCollapsed(!collapsed)
        }}
        order={order}
        ref={panelHandler}
      >
        {children}
      </Panel>
    ),
  }
}
