import React from 'react'
import { progressData } from './Progress.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Progress',
}

export const Default = () => {
  const Progress = Renderer.components(progressData)

  return <Progress />
}
