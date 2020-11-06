import React from 'react'
import { mentionsData } from './Mentions.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Mentions',
  parameters: {
    data: {
      Default: mentionsData,
    },
  },
}

export const Default = () => {
  const Mentions = Renderer.components(mentionsData)

  return <Mentions />
}
