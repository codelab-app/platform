'use client'

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

export const minBuilderPaneWidthInPixels = 600

export const useResizeHandler = ({
  breakpoints,
  children,
  className,
  collapsible,
  id,
  order,
  resizeDirection,
  showCollapseButton = false,
}: CuiResizablePanelProps) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const panelHandler = useRef<ImperativePanelHandle>(null)
  const showCollapseControl = collapsible && (collapsed || showCollapseButton)
  const breakpoint = useBreakpoint(breakpoints)

  useEffect(() => {
    /**
     * Only resize on window resize if not collapsed already
     */
    if (!collapsed) {
      panelHandler.current?.resize(breakpoint.default)
    }
  }, [breakpoint, collapsed])

  return {
    collapseControl: showCollapseControl && (
      <CollapseControl
        collapsed={collapsed}
        onClick={() => {
          if (collapsed) {
            panelHandler.current?.expand(defaultSizePercent)
          } else {
            panelHandler.current?.collapse()
          }

          setCollapsed(!collapsed)
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
        onResize={onResize}
        order={order}
        ref={panelHandler}
        /**
         * Use this instead of `minSize` & `maxSize` to prevent flicker while resizing
         */
        // style={
        //   collapsed
        //     ? {}
        //     : {
        //         maxWidth: maxSizePx,
        //         minWidth: minSizePx,
        //       }
        // }
      >
        {children}
      </Panel>
    ),
  }
}
