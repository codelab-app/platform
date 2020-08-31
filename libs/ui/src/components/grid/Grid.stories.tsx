import React from 'react'
import { TreeDom } from '../../renderer/TreeDom'
import { gridData } from './Grid.data'
import { responsiveGridData } from './Grid--responsive.data'

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
