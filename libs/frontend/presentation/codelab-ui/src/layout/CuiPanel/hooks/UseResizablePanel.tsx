import type { PropsWithChildren } from 'react'

import { useRef, useState } from 'react'
import { type ImperativePanelHandle, Panel } from 'react-resizable-panels'

import type { CuiPanelProps } from '../CuiPanel'

import { CollapseControl, CuiResizeHandle } from '../components'

export type CuiResizablePanelProps = Pick<CuiPanelProps, 'defaultSize'> &
  PropsWithChildren<
    Pick<
      CuiPanelProps,
      'collapsible' | 'defaultSize' | 'maxSize' | 'minSize' | 'order'
    > & {
      // Overrides the state
      collapsed?: boolean
      // can add support for top, buttom later on
      resizeDirection: 'left' | 'right'
      showCollapseButton?: boolean
      className?: string
    }
  >

export const useResizeHandler = ({
  children,
  className,
  collapsible,
  defaultSize,
  maxSize,
  minSize,
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
          console.log('Collapsed clicked', collapsed)

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
        className={className}
        collapsible={collapsible}
        defaultSize={defaultSize}
        maxSize={maxSize}
        minSize={minSize}
        onCollapse={() => {
          setCollapsed(true)
        }}
        onExpand={() => {
          setCollapsed(false)
        }}
        onResize={(size, prevSize) => {
          //
        }}
        order={order}
        ref={panelHandler}
      >
        {children}
      </Panel>
    ),
  }
}
