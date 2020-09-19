import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { iconData } from './Icon.data'

export default {
  title: 'Icon',
}

export const Default = () => {
  const Icon = TreeDom.render(iconData)

  return <Icon />
}
