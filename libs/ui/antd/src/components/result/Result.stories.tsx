import React from 'react'
import { resultData } from './Result.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Result',
  parameters: {
    data: {
      Default: resultData,
    },
  },
}

export const Default = () => {
  const Result = Renderer.components(resultData)

  return <Result />
}
