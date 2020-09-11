import React from 'react'
import { dividerData } from './Divider.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Divider',
}

export const Default = () => {
  const Divider = TreeDom.render(dividerData)

  return <Divider />
}
