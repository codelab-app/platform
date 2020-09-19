import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { progressData } from './Progress.data'

export default {
  title: 'Progress',
}

export const Default = () => {
  const Progress = TreeDom.render(progressData)

  return <Progress />
}
