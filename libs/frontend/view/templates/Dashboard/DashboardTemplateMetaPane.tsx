import { motion, MotionValue } from 'framer-motion'
import React, { ComponentType } from 'react'
import tw from 'twin.macro'
import { UseResizable } from '../../components'
import { sidebarNavigationWidth } from './constants'

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
  const sidebarNavMarginLeft = hasSidebarNavigation ? sidebarNavigationWidth : 0
  const mainPaneMarginLeft = hasMainPane ? mainPaneWidth : 0

  return (
    <motion.div
      animate={{ y: 0 }}
      css={tw`fixed left-0 right-0 bottom-0 bg-white z-50 flex flex-col`}
      exit={{ y: 400 }}
      initial={{ y: 0 }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...resizable.containerProps}
      style={{
        ...resizable.containerProps.style,
        marginLeft: mainPaneMarginLeft,
        paddingLeft: sidebarNavMarginLeft,
      }}
    >
      <motion.div
        css={[tw`bg-gray-200 w-full z-10`, `min-height: 2px`]}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...resizable.yDragHandleProps}
      />
      <div css={tw`flex-1 overflow-y-auto`}>
        <MetaPane />
      </div>
    </motion.div>
  )
}

DashboardTemplateMetaPane.displayName = 'DashboardTemplateMetaPane'
