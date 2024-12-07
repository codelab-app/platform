import type { PropsWithChildren } from 'react'

import { useEffect, useRef, useState } from 'react'
import { type ImperativePanelHandle, Panel } from 'react-resizable-panels'

import type { CuiPanelProps } from '../CuiPanel'

import { CollapseControl, CuiResizeHandle } from '../components'
import {
  PaneSection,
  usePanelWidth,
  useWidthInPercent,
} from './usePanelWidth.hook'

export type CuiResizablePanelProps = Pick<CuiPanelProps, 'defaultSize'> &
  PropsWithChildren<
    Pick<
      CuiPanelProps,
      | 'collapsible'
      | 'defaultSize'
      | 'id'
      | 'maxSize'
      | 'minSize'
      | 'onResize'
      | 'order'
    > & {
      // Overrides the state
      defaultCollapsed?: boolean
      // can add support for top, buttom later on
      resizeDirection: 'left' | 'right'
      showCollapseButton?: boolean
      className?: string
      minSizePx?: number
      maxSizePx?: number
      defaultSizePx?: number
    }
  >

export const minBuilderPaneWidthInPixels = 600

export const useResizeHandler = ({
  children,
  className,
  collapsible,
  defaultCollapsed = false,
  defaultSize,
  defaultSizePx,
  id,
  maxSize,
  maxSizePx,
  minSize,
  minSizePx,
  onResize,
  order,
  resizeDirection,
  showCollapseButton = false,
}: CuiResizablePanelProps) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const panelHandler = useRef<ImperativePanelHandle>(null)
  const showCollapseControl = collapsible && (collapsed || showCollapseButton)
  const minSizePercent = useWidthInPercent(minSizePx)
  const maxSizePercent = useWidthInPercent(maxSizePx)
  const defaultSizePercent = useWidthInPercent(defaultSizePx)
  /**
   * Collapse both if content min is reached
   */
  // const builderWidth = usePanelWidth(PaneSection.Builder)
  // useEffect(() => {
  //   if (builderWidth === undefined) {
  //     return
  //   }

  //   const shouldCollapse = builderWidth < minBuilderPaneWidthInPixels

  //   if (shouldCollapse) {
  //     panelHandler.current?.collapse()
  //   }
  // }, [builderWidth])

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
        defaultSize={defaultSizePercent}
        id={id}
        /**
         * This causes width to flicker
         */
        // maxSize={maxSizePercent}
        // minSize={minSizePercent}
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
        style={
          collapsed
            ? {}
            : {
                maxWidth: maxSizePx,
                minWidth: minSizePx,
              }
        }
      >
        {children}
      </Panel>
    ),
  }
}
