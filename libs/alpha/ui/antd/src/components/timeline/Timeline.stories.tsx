import React from 'react'
import { timelineData } from './Timeline.data'
import { Renderer } from '@codelab/alpha/core/renderer'

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
