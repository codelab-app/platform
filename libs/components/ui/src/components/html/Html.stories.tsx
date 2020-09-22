import React from 'react'
import { divData } from './Html.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Html',
}

export const div = () => {
  const Div = Renderer.components(divData)

  return <Div />
}
