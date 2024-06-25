import type { PropsWithChildren } from 'react'
import React, { useRef, useState } from 'react'
import { type ImperativePanelHandle, Panel } from 'react-resizable-panels'
import { CollapseControl, CuiResizeHandler } from '../components'

export type CuiResizablePanelProps = PropsWithChildren<{
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
    handler: <CuiResizeHandler />,
    panel: (
      <Panel
        collapsible={collapsible}
        onCollapse={setCollapsed}
        order={order}
        ref={panelHandler}
      >
        {children}
      </Panel>
    ),
  }
}
