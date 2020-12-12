import React from 'react'
import { divData } from './Html.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Html',
  parameters: {
    data: {
      Default: divData,
    },
  },
}

export const div = () => {
  const Div = Renderer.components(divData)

  return <Div />
}
