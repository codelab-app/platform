import React from 'react'
import { switchData } from './Switch.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Switch',
}

export const Default = () => {
  const Switch = Renderer.components(switchData)

  return <Switch />
}
