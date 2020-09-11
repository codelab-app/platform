import React from 'react'
import { radioData } from './Radio.data'
import { TreeDom } from '../../renderer'

export default {
  title: 'Radio',
}

export const Default = () => {
  const Radio = TreeDom.render(radioData)

  return <Radio />
}
