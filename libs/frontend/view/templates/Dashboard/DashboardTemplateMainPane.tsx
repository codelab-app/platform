import {
  componentLikeDestructure,
  ComponentTypeLike,
} from '@codelab/frontend/shared/utils'
import Sider from 'antd/lib/layout/Sider'
import { motion } from 'framer-motion'
import React from 'react'
import tw from 'twin.macro'
import { UseResizable } from '../../components'
import { sidebarNavigationWidth } from './constants'

export interface DashboardTemplateMainPaneProps {
  MainPane: ComponentTypeLike
  hasHeader: boolean
  headerHeight: number
  hasSidebarNavigation: boolean
  resizable: UseResizable
}

const DashboardTemplateMainPane = ({
  hasHeader,
  hasSidebarNavigation,
  resizable,
  headerHeight,
  ...props
}: DashboardTemplateMainPaneProps) => {
  const [MainPane, mainPaneProps] = componentLikeDestructure(props.MainPane)

  return (
    <motion.div
      css={tw`fixed left-0 top-0 bottom-0 h-full`}
      {...resizable.containerProps}
      style={{
        ...resizable.containerProps.style,
        marginTop: hasHeader ? headerHeight : 0,
        marginLeft: hasSidebarNavigation ? sidebarNavigationWidth : 0,
        zIndex: 60,
      }}
    >
      <Sider
        theme="light"
        width="auto"
        css={tw`w-auto border-r border-gray-200 max-h-full h-full overflow-x-hidden overflow-y-auto`}
      >
        <div css={tw`relative max-h-full h-full flex flex-row`}>
          <motion.div css={tw`h-full flex-1`}>
            <MainPane {...mainPaneProps} />
          </motion.div>
          <motion.div
            css={[tw`bg-gray-200 h-full z-10`, `width: 2px`]}
            {...resizable.xDragHandleProps}
          />
        </div>
      </Sider>
    </motion.div>
  )
}

export default DashboardTemplateMainPane
