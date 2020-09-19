import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { skeletonData } from './Skeleton.data'

export default {
  title: 'Skeleton',
}

export const Default = () => {
  const Skeleton = TreeDom.render(skeletonData)

  return <Skeleton />
}
