import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { gridData } from './data/Grid-1--default.data'
import { responsiveGridData } from './data/Grid-2--responsive.data'

export default {
  title: 'Grid',
}

export const Default = () => {
  const Grid = TreeDom.render(gridData)

  return <Grid />
}

export const ResponsiveGrid = () => {
  const Grid = TreeDom.render(responsiveGridData)

  return <Grid />
}
