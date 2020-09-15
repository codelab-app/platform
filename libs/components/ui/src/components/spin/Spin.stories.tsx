import React from 'react'
import { spinData } from './Spin.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Spin',
}

export const Default = () => {
  const Spin = TreeDom.render(spinData)

  return <Spin />
}
