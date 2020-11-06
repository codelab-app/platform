import React from 'react'
import { transferData } from './Transfer.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Transfer',
  parameters: {
    data: {
      Default: transferData,
    },
  },
}

export const Default = () => {
  const Transfer = Renderer.components(transferData)

  return <Transfer />
}
