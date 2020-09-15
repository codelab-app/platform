import React from 'react'
import { badgeData } from './Badge.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Badge',
}

export const Default = () => {
  const Badge = TreeDom.render(badgeData)

  return <Badge />
}
