import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { radioData } from './Radio.data'

export default {
  title: 'Radio',
}

export const Default = () => {
  const Radio = TreeDom.render(radioData)

  return <Radio />
}
