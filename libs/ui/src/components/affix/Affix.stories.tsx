import React from 'react'
import { affixData } from './Affix.data'
import { TreeDom } from '../../renderer'

export default {
  title: 'Affix',
}

export const Default = () => {
  const Affix = TreeDom.render(affixData)

  return <Affix />
}
