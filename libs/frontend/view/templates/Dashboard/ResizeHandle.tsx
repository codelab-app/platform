import React from 'react'
import { PanelResizeHandle } from 'react-resizable-panels'
import tw from 'twin.macro'

const ResizeHandle = () => {
  return (
    <PanelResizeHandle
      css={tw`w-1 hover:bg-blue-400 active:bg-blue-400 h-full`}
    />
  )
}

ResizeHandle.displayName = 'ResizeHandle'
export default ResizeHandle
