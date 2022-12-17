import Sider from 'antd/lib/layout/Sider'
import { motion } from 'framer-motion'
import type { ComponentType } from 'react'
import React from 'react'
import tw from 'twin.macro'
import type { UseResizable } from '../../components'
import { sidebarWidth } from './constants'

export interface ExplorerPaneProps {
  hasHeader: boolean
  headerHeight: number
  hasSidebarNavigation: boolean
  resizable: UseResizable
  paddingBottom: number
  ExplorerPane: ComponentType
}

export const DashboardTemplateExplorerPane = ({
  hasHeader,
  hasSidebarNavigation,
  resizable,
  headerHeight,
  ExplorerPane,
  paddingBottom,
}: ExplorerPaneProps) => {
  return (
    <motion.div
      css={tw`fixed left-0 top-0 bottom-0 h-full`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...resizable.containerProps}
      style={{
        ...resizable.containerProps.style,
        marginTop: hasHeader ? headerHeight : 0,
        marginLeft: hasSidebarNavigation ? sidebarWidth : 0,
        paddingBottom: paddingBottom,
        // zIndex: 60,
      }}
    >
      <Sider
        css={tw`w-auto border-r border-gray-200 max-h-full h-full overflow-x-hidden overflow-y-auto`}
        theme="light"
        width="auto"
      >
        <div css={tw`relative max-h-full h-full flex flex-row`}>
          <motion.div css={tw`h-full flex-1`}>
            <ExplorerPane />
          </motion.div>
          <motion.div
            css={[tw`bg-gray-200 h-full z-10`, `width: 2px`]}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...resizable.xDragHandleProps}
          />
        </div>
      </Sider>
    </motion.div>
  )
}

DashboardTemplateExplorerPane.displayName = 'DashboardTemplateExplorerPane'
