import React from 'react'
import { affixData } from './Affix.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Affix',
  parameters: {
    data: {
      Default: affixData,
    },
  },
}

export const Default = () => {
  const Affix = Renderer.components(affixData)

  return <Affix />
}
