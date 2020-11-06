import React from 'react'
import { gridData } from './data/Grid-1--default.data'
import { responsiveGridData } from './data/Grid-2--responsive.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Grid',
  parameters: {
    data: {
      Default: gridData,
      ResponsiveGrid: responsiveGridData,
    },
  },
}

export const Default = () => {
  const Grid = Renderer.components(gridData)

  return <Grid />
}

export const ResponsiveGrid = () => {
  const Grid = Renderer.components(responsiveGridData)

  return <Grid />
}
