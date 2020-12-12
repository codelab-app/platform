import React from 'react'
import { skeletonData } from './Skeleton.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Skeleton',
  parameters: {
    data: {
      Default: skeletonData,
    },
  },
}

export const Default = () => {
  const Skeleton = Renderer.components(skeletonData)

  return <Skeleton />
}
