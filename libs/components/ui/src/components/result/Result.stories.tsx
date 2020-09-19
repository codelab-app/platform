import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { resultData } from './Result.data'

export default {
  title: 'Result',
}

export const Default = () => {
  const Result = TreeDom.render(resultData)

  return <Result />
}
