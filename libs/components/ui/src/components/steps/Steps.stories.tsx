import React from 'react'
import { stepsData } from './Steps.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Steps',
}

export const Default = () => {
  const Steps = Renderer.components(stepsData)

  return <Steps />
}
