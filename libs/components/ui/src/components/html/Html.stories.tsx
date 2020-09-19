import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { divData } from './Html.data'

export default {
  title: 'Html',
}

export const div = () => {
  const Div = TreeDom.render(divData)

  return <Div />
}
