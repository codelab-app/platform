import React from 'react'
import { rglData } from './data/RGL-1--default.data'
import { responsiveGridData } from './data/RGL-2--responsive.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'RGL',
  parameters: {
    data: {
      Default: rglData,
      ResponsiveGrid: responsiveGridData,
    },
  },
}

export const Default = () => {
  const RGL = Renderer.components(rglData)

  return <RGL />
}

export const ResponsiveGrid = () => {
  const RGL = Renderer.components(responsiveGridData)

  return <RGL />
}
