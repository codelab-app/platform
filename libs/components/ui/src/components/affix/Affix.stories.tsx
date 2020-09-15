import React from 'react'
import { affixData } from './Affix.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Affix',
}

export const Default = () => {
  const Affix = TreeDom.render(affixData)

  return <Affix />
}
