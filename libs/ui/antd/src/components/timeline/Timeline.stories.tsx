import React from 'react'
import { timelineData } from './Timeline.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Timeline',
  parameters: {
    data: {
      Default: timelineData,
    },
  },
}

export const Default = () => {
  const Timeline = Renderer.components(timelineData)

  return <Timeline />
}
