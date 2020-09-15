import React from 'react'
import { divData } from './Html.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Html',
}

export const div = () => {
  const Div = TreeDom.render(divData)

  return <Div />
}
