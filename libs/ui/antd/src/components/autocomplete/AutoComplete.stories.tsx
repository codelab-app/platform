import React from 'react'
import { autocompleteData } from './AutoComplete.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'AutoComplete',
  parameters: {
    data: {
      Default: autocompleteData,
    },
  },
}

export const Default = () => {
  const AutoComplete = Renderer.components(autocompleteData)

  return <AutoComplete />
}
