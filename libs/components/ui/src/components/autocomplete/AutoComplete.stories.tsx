import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { autocompleteData } from './AutoComplete.data'

export default {
  title: 'AutoComplete',
}

export const Default = () => {
  const AutoComplete = TreeDom.render(autocompleteData)

  return <AutoComplete />
}
