import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { transferData } from './Transfer.data'

export default {
  title: 'Transfer',
}

export const Default = () => {
  const Transfer = TreeDom.render(transferData)

  return <Transfer />
}
