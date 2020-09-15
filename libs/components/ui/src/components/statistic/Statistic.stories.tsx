import React from 'react'
import { statisticData } from './Statistic.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Statistic',
}

export const Default = () => {
  const Statistic = TreeDom.render(statisticData)

  return <Statistic />
}
