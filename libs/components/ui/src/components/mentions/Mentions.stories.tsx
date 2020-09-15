import React from 'react'
import { mentionsData } from './Mentions.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Mentions',
}

export const Default = () => {
  const Mentions = TreeDom.render(mentionsData)

  return <Mentions />
}
