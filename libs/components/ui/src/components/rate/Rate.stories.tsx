import React from 'react'
import { rateData } from './Rate.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Rate',
}

export const Default = () => {
  const Rate = TreeDom.render(rateData)

  return <Rate />
}
