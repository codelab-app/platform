import React from 'react'
import { descriptionsData } from './Descriptions.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Descriptions',
}

export const Default = () => {
  const Descriptions = TreeDom.render(descriptionsData)

  return <Descriptions />
}
