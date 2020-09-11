import React from 'react'
import { statisticData } from './Statistic.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Statistic',
}

export const Default = () => {
  const Statistic = TreeDom.render(statisticData)

  return <Statistic />
}
