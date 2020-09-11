import React from 'react'
import { transferData } from './Transfer.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Transfer',
}

export const Default = () => {
  const Transfer = TreeDom.render(transferData)

  return <Transfer />
}
