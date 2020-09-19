import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { cascaderData } from './Cascader.data'

export default {
  title: 'Cascader',
}

export const Default = () => {
  const Cascader = TreeDom.render(cascaderData)

  return <Cascader />
}
