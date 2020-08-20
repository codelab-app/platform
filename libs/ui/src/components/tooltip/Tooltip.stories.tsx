import React from 'react'
import { tooltipData } from './Tooltip.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Tooltip',
}

export const Default = () => {
  const Tooltip = TreeDom.render(tooltipData)

  return <Tooltip />
}
