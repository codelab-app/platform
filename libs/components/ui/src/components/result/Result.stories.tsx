import React from 'react'
import { resultData } from './Result.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Result',
}

export const Default = () => {
  const Result = TreeDom.render(resultData)

  return <Result />
}
