import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { affixData } from './Affix.data'

export default {
  title: 'Affix',
}

export const Default = () => {
  const Affix = TreeDom.render(affixData)

  return <Affix />
}
