import React from 'react'
import { iconData } from './Icon.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Icon',
}

export const Default = () => {
  const Icon = TreeDom.render(iconData)

  return <Icon />
}
