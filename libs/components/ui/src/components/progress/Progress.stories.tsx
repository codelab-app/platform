import React from 'react'
import { progressData } from './Progress.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Progress',
}

export const Default = () => {
  const Progress = TreeDom.render(progressData)

  return <Progress />
}
