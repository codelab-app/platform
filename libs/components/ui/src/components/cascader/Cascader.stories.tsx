import React from 'react'
import { cascaderData } from './Cascader.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Cascader',
}

export const Default = () => {
  const Cascader = TreeDom.render(cascaderData)

  return <Cascader />
}
