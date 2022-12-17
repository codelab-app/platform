import { motion } from 'framer-motion'
import type { ComponentType } from 'react'
import React from 'react'
import tw from 'twin.macro'
import type { UseResizable } from '../../components'
import { defaultHeaderHeight } from './constants'

export interface ConfigPaneProps {
  ConfigPane: ComponentType
  resizable: UseResizable
}

export const DashboardTemplateConfigPane = ({
  resizable,
  ConfigPane,
}: ConfigPaneProps) => {
  return (
    <motion.div
      css={tw`fixed top-0 right-0 bottom-0 bg-white z-50 flex flex-row`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...resizable.containerProps}
      style={{
        ...resizable.containerProps.style,
        top: `${defaultHeaderHeight}px`,
        height: `calc(100% - ${defaultHeaderHeight}px)`,
      }}
    >
      <motion.div
        css={[tw`bg-gray-200 h-full z-10`, `width: 2px`]}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...resizable.xDragHandleProps}
      />
      <div css={tw`flex-1 overflow-y-auto`}>
        <ConfigPane />
      </div>
    </motion.div>
  )
}

DashboardTemplateConfigPane.displayName = 'DashboardTemplateMetaPane'
