import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { tooltipData } from './Tooltip.data'

export default {
  title: 'Tooltip',
}

export const Default = () => {
  const Tooltip = TreeDom.render(tooltipData)

  return <Tooltip />
}
