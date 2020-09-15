import React from 'react'
import { backtopData } from './BackTop.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'BackTop',
}

export const Default = () => {
  const BackTop = TreeDom.render(backtopData)

  return <BackTop />
}
