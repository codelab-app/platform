import { motion } from 'framer-motion'
import React, { ComponentType, useEffect, useState } from 'react'
import tw from 'twin.macro'
import { UseResizable } from '../../../components'
import { sidebarWidth } from '../constants'
import { DashboardTemplateProps } from '../types'

export type EditorPaneProps = {
  EditorPane: ComponentType<Pick<EditorPaneProps, 'resizable'>>
  resizable: UseResizable
  metaPaneResizable: UseResizable
} & Pick<DashboardTemplateProps, 'ConfigPane'>

export const DashboardTemplateEditorPane = ({
  EditorPane,
  resizable,
  metaPaneResizable,
  ConfigPane,
}: EditorPaneProps) => {
  const [metaPaneWidth, setMetaPaneWidth] = useState(0)

  useEffect(() => {
    if (!ConfigPane) return

    setMetaPaneWidth(metaPaneResizable.width.get())
    const unsub = metaPaneResizable.width.onChange(() => {
      setMetaPaneWidth(metaPaneResizable.width.get())
    })

    return unsub
  }, [ConfigPane])

  return (
    <motion.div
      css={tw`fixed left-0 right-0 bottom-0 h-full bg-white z-40 flex flex-col pr-[300px]`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...resizable.containerProps}
      style={{
        ...resizable.containerProps.style,
        // marginLeft: mainPaneMarginLeft,
        paddingLeft: sidebarWidth,
        paddingRight: metaPaneWidth + 'px',
        // top: `${defaultHeaderHeight}px`,
      }}
    >
      <motion.div
        css={[tw`bg-gray-200 w-full z-10 absolute`, `height: 2px`]}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...resizable.yDragHandleProps}
      />
      <div css={tw`flex-1 min-w-full px-4`}>
        <EditorPane resizable={resizable} />
      </div>
    </motion.div>
  )
}
