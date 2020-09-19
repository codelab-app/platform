import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { backtopData } from './BackTop.data'

export default {
  title: 'BackTop',
}

export const Default = () => {
  const BackTop = TreeDom.render(backtopData)

  return <BackTop />
}
