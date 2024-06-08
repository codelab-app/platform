import React from 'react'
import { type CuiResizablePanelProps, useResizeHandler } from './hooks'

export const CuiResizablePanel = (props: CuiResizablePanelProps) => {
  const { collapseControl, handler, panel } = useResizeHandler(props)
  const { resizeDirection } = props

  return (
    <>
      {resizeDirection === 'left' && collapseControl}
      {resizeDirection === 'left' && handler}
      {panel}
      {resizeDirection === 'right' && handler}
      {resizeDirection === 'right' && collapseControl}
    </>
  )
}
