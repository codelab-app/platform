import React from 'react'
import { timelineData } from './Timeline.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Timeline',
}

export const Default = () => {
  const Timeline = Renderer.components(timelineData)

  return <Timeline />
}
