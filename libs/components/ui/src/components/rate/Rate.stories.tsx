import React from 'react'
import { rateData } from './Rate.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Rate',
}

export const Default = () => {
  const Rate = TreeDom.render(rateData)

  return <Rate />
}
