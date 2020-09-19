import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { mentionsData } from './Mentions.data'

export default {
  title: 'Mentions',
}

export const Default = () => {
  const Mentions = TreeDom.render(mentionsData)

  return <Mentions />
}
