import {
  componentLikeDestructure,
  ComponentTypeLike,
} from '@codelab/frontend/shared/utils'
import { motion, MotionValue } from 'framer-motion'
import React from 'react'
import tw from 'twin.macro'
import { UseResizable } from '../../components'
import { sidebarNavigationWidth } from './constants'

export interface DashboardTemplateMetaPaneProps {
  hasSidebarNavigation: boolean
  MetaPane: ComponentTypeLike
  resizable: UseResizable
  hasMainPane: boolean
  mainPaneWidth: MotionValue<number>
}

export const DashboardTemplateMetaPane = ({
  hasSidebarNavigation,
  hasMainPane,
  mainPaneWidth,
  resizable,
  ...props
}: DashboardTemplateMetaPaneProps) => {
  const [MetaPane, metaPaneProps] = componentLikeDestructure(props.MetaPane)
  const sidebarNavMarginLeft = hasSidebarNavigation ? sidebarNavigationWidth : 0
  const mainPaneMarginLeft = hasMainPane ? mainPaneWidth : 0

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      exit={{ y: 400 }}
      css={tw`fixed left-0 right-0 bottom-0 bg-white z-50 flex flex-col`}
      {...resizable.containerProps}
      style={{
        ...resizable.containerProps.style,
        marginLeft: mainPaneMarginLeft,
        paddingLeft: sidebarNavMarginLeft,
      }}
    >
      <motion.div
        css={[tw`bg-gray-200 w-full z-10`, `min-height: 2px`]}
        {...resizable.yDragHandleProps}
      />
      <div css={tw`flex-1`}>
        <MetaPane {...metaPaneProps} />
      </div>
    </motion.div>
  )
}

DashboardTemplateMetaPane.displayName = 'DashboardTemplateMetaPane'
