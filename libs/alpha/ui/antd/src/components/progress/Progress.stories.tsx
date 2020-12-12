import React from 'react'
import { progressData } from './Progress.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Progress',
  parameters: {
    data: {
      Default: progressData,
    },
  },
}

export const Default = () => {
  const Progress = Renderer.components(progressData)

  return <Progress />
}
