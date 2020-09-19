import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { rateData } from './Rate.data'

export default {
  title: 'Rate',
}

export const Default = () => {
  const Rate = TreeDom.render(rateData)

  return <Rate />
}
