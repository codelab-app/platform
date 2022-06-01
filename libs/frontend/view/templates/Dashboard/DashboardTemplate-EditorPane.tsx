import { motion } from 'framer-motion'
import React, { ComponentType } from 'react'
import tw from 'twin.macro'
import { UseResizable } from '../../components'
import { sidebarWidth } from './constants'

type EditorPaneProps = {
  EditorPane: ComponentType
  resizable: UseResizable
}

export const DashboardTemplateEditorPane = ({
  EditorPane,
  resizable,
}: EditorPaneProps) => {
  return (
    <motion.div
      css={tw`fixed left-0 right-0 bottom-0 h-full bg-white z-50 flex flex-col`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...resizable.containerProps}
      style={{
        ...resizable.containerProps.style,
        // marginLeft: mainPaneMarginLeft,
        paddingRight: 0,
        paddingLeft: sidebarWidth,
        // top: `${defaultHeaderHeight}px`,
      }}
    >
      <motion.div
        css={[tw`bg-gray-200 w-full z-10`, `height: 2px`]}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...resizable.yDragHandleProps}
      />
      <div css={tw`flex-1 overflow-y-auto min-w-full`}>
        <EditorPane />
      </div>
    </motion.div>
  )
}
