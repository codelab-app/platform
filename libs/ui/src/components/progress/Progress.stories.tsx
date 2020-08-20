import React from 'react'
import { progressData } from './Progress.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Progress',
}

export const Default = () => {
  const Progress = TreeDom.render(progressData)

  return <Progress />
}
