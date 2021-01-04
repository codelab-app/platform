import React from 'react'
import { statisticData } from './Statistic.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Statistic',
  parameters: {
    data: {
      Default: statisticData,
    },
  },
}

export const Default = () => {
  const Statistic = Renderer.components(statisticData)

  return <Statistic />
}
