import React from 'react'
import { iconData } from './Icon.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Icon',
}

export const Default = () => {
  const Icon = TreeDom.render(iconData)

  return <Icon />
}
