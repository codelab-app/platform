import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { spinData } from './Spin.data'

export default {
  title: 'Spin',
}

export const Default = () => {
  const Spin = TreeDom.render(spinData)

  return <Spin />
}
