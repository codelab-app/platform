import React from 'react'
import { stepsData } from './Steps.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Steps',
  parameters: {
    data: {
      Default: stepsData,
    },
  },
}

export const Default = () => {
  const Steps = Renderer.components(stepsData)

  return <Steps />
}
