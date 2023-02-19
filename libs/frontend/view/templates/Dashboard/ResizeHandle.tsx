import React from 'react'
import { PanelResizeHandle } from 'react-resizable-panels'
import tw from 'twin.macro'

const ResizeHandle = () => {
  return (
    <PanelResizeHandle
      css={tw`w-[3px] hover:w-4 hover:bg-gray-300 active:w-4 active:bg-gray-300  h-full bg-gray-200`}
    />
  )
}

ResizeHandle.displayName = 'ResizeHandle'
export default ResizeHandle
