import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { typographyData } from './Typography.data'

export default {
  title: 'Typography',
}

export const Default = () => {
  const Typography = TreeDom.render(typographyData)

  return <Typography />
}
