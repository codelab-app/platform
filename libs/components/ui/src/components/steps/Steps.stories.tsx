import React from 'react'
import { stepsData } from './Steps.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Steps',
}

export const Default = () => {
  const Steps = TreeDom.render(stepsData)

  return <Steps />
}
