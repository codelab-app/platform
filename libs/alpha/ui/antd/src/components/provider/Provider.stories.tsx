import React from 'react'
import { providerData } from './Provider.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Provider',
  parameters: {
    data: {
      Default: providerData,
    },
  },
}

export const Default = () => {
  const Button = Renderer.components(providerData)

  return <Button />
}
