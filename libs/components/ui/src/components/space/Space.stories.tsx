import React from 'react'
import { spaceData } from './Space.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Space',
}

export const Default = () => {
  const Space = TreeDom.render(spaceData)

  return <Space />
}
