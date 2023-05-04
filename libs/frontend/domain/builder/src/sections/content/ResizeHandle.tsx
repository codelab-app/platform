import React from 'react'
import { PanelResizeHandle } from 'react-resizable-panels'
import tw from 'twin.macro'

const ResizeHandle = () => {
  return (
    <PanelResizeHandle
      css={tw`w-[3px] hover:bg-blue-300 active:bg-blue-400 h-full bg-gray-200`}
    />
  )
}

ResizeHandle.displayName = 'ResizeHandle'

export default ResizeHandle
