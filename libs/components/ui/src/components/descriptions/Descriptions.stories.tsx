import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { descriptionsData } from './Descriptions.data'

export default {
  title: 'Descriptions',
}

export const Default = () => {
  const Descriptions = TreeDom.render(descriptionsData)

  return <Descriptions />
}
