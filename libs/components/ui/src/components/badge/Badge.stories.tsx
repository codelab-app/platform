import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { badgeData } from './Badge.data'

export default {
  title: 'Badge',
}

export const Default = () => {
  const Badge = TreeDom.render(badgeData)

  return <Badge />
}
