import React from 'react'
import { autocompleteData } from './AutoComplete.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'AutoComplete',
}

export const Default = () => {
  const AutoComplete = TreeDom.render(autocompleteData)

  return <AutoComplete />
}
