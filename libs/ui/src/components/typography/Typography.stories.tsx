import React from 'react'
import { typographyData } from './Typography.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Typography',
}

export const Default = () => {
  const Typography = TreeDom.render(typographyData)

  return <Typography />
}
