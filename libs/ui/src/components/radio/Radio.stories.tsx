import React from 'react'
import { radioData } from './Radio.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Radio',
}

export const Default = () => {
  const Radio = TreeDom.render(radioData)

  return <Radio />
}
