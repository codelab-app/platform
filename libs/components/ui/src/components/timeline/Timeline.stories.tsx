import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { timelineData } from './Timeline.data'

export default {
  title: 'Timeline',
}

export const Default = () => {
  const Timeline = TreeDom.render(timelineData)

  return <Timeline />
}
