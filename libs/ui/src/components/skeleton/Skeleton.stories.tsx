import React from 'react'
import { skeletonData } from './Skeleton.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Skeleton',
}

export const Default = () => {
  const Skeleton = TreeDom.render(skeletonData)

  return <Skeleton />
}
