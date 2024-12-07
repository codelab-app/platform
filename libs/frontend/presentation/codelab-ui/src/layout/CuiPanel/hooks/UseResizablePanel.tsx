import type { PropsWithChildren } from 'react'

import { BreakpointSize } from '@codelab/frontend/abstract/types'
import { useEffect, useRef, useState } from 'react'
import { type ImperativePanelHandle, Panel } from 'react-resizable-panels'
import { useWindowSize } from 'react-use'

import type { CuiPanelProps } from '../CuiPanel'

import { CollapseControl, CuiResizeHandle } from '../components'
import {
  type ResponsiveBreakpoints,
  useBreakpoint,
} from './useBreakpoints.hook'

export type CuiResizablePanelProps = PropsWithChildren<
  Pick<CuiPanelProps, 'collapsible' | 'id' | 'order'> & {
    // Overrides the state
    collapsed?: boolean
    // can add support for top, buttom later on
    resizeDirection: 'left' | 'right'
    showCollapseButton?: boolean
    className?: string
    breakpoints: ResponsiveBreakpoints
  }
>

export const useResizeHandler = ({
  breakpoints,
  children,
  className,
  collapsible,
  id,
  order,
  resizeDirection,
  showCollapseButton = true,
}: CuiResizablePanelProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const panelHandler = useRef<ImperativePanelHandle>(null)
  const showCollapseControl = collapsible && (collapsed || showCollapseButton)
  const breakpoint = useBreakpoint(breakpoints)

  useEffect(() => {
    console.log('change breakpoint', breakpoint)

    // Handle breakpoint changes
    panelHandler.current?.resize(breakpoint.default)
  }, [breakpoint])

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
        className={className}
        collapsible={collapsible}
        defaultSize={breakpoint.default}
        id={id}
        maxSize={breakpoint.max}
        minSize={breakpoint.min}
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
