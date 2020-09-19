import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { spaceData } from './Space.data'

export default {
  title: 'Space',
}

export const Default = () => {
  const Space = TreeDom.render(spaceData)

  return <Space />
}
