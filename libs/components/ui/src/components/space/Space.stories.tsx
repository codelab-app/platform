import React from 'react'
import { spaceData } from './Space.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Space',
}

export const Default = () => {
  const Space = TreeDom.render(spaceData)

  return <Space />
}
