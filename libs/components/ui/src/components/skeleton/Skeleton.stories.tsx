import React from 'react'
import { skeletonData } from './Skeleton.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Skeleton',
}

export const Default = () => {
  const Skeleton = Renderer.components(skeletonData)

  return <Skeleton />
}
