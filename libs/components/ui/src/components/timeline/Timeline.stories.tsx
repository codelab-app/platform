import React from 'react'
import { timelineData } from './Timeline.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Timeline',
}

export const Default = () => {
  const Timeline = TreeDom.render(timelineData)

  return <Timeline />
}
