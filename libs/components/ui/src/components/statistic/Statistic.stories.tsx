import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { statisticData } from './Statistic.data'

export default {
  title: 'Statistic',
}

export const Default = () => {
  const Statistic = TreeDom.render(statisticData)

  return <Statistic />
}
