import { motion, MotionValue } from 'framer-motion'
import React, { ComponentType } from 'react'
import tw from 'twin.macro'
import { UseResizable } from '../../components'
import { defaultHeaderHeight, sidebarWidth } from './constants'

export interface DashboardTemplateMetaPaneProps {
  hasSidebarNavigation: boolean
  MetaPane: ComponentType
  resizable: UseResizable
  hasMainPane: boolean
  mainPaneWidth: MotionValue<number>
}

export const DashboardTemplateMetaPane = ({
  hasSidebarNavigation,
  hasMainPane,
  mainPaneWidth,
  resizable,
  MetaPane,
}: DashboardTemplateMetaPaneProps) => {
  const sidebarNavMarginLeft = hasSidebarNavigation ? sidebarWidth : 0
  const mainPaneMarginLeft = hasMainPane ? mainPaneWidth : 0

  return (
    <motion.div
      css={tw`fixed top-0 right-0 bottom-0 h-full bg-white z-50 flex flex-row`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...resizable.containerProps}
      style={{
        ...resizable.containerProps.style,
        // marginLeft: mainPaneMarginLeft,
        // paddingLeft: sidebarNavMarginLeft,
        top: `${defaultHeaderHeight}px`,
      }}
    >
      <motion.div
        css={[tw`bg-gray-200 h-full z-10`, `width: 2px`]}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...resizable.xDragHandleProps}
      />
      <div css={tw`flex-1 overflow-y-auto`}>
        <MetaPane />
      </div>
    </motion.div>
  )
}

DashboardTemplateMetaPane.displayName = 'DashboardTemplateMetaPane'
