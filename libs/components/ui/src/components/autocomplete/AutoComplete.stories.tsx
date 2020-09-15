import React from 'react'
import { autocompleteData } from './AutoComplete.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'AutoComplete',
}

export const Default = () => {
  const AutoComplete = TreeDom.render(autocompleteData)

  return <AutoComplete />
}
