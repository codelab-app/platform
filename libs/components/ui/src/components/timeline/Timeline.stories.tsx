import React from 'react'
import { timelineData } from './Timeline.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Timeline',
}

export const Default = () => {
  const Timeline = TreeDom.render(timelineData)

  return <Timeline />
}
