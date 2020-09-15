import React from 'react'
import { descriptionsData } from './Descriptions.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Descriptions',
}

export const Default = () => {
  const Descriptions = TreeDom.render(descriptionsData)

  return <Descriptions />
}
