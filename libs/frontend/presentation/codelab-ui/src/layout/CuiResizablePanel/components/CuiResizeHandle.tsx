import React from 'react'
import { PanelResizeHandle } from 'react-resizable-panels'

export const CuiResizeHandle = () => {
  return (
    <PanelResizeHandle className="h-full w-[3px] bg-gray-200 hover:bg-blue-300 active:bg-blue-400" />
  )
}
