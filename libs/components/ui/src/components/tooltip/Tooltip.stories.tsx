import React from 'react'
import { tooltipData } from './Tooltip.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Tooltip',
}

export const Default = () => {
  const Tooltip = TreeDom.render(tooltipData)

  return <Tooltip />
}
