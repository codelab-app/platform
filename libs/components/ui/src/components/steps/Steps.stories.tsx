import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { stepsData } from './Steps.data'

export default {
  title: 'Steps',
}

export const Default = () => {
  const Steps = TreeDom.render(stepsData)

  return <Steps />
}
