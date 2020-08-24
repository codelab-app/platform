import React from 'react'
import { mentionsData } from './Mentions.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Mentions',
}

export const Default = () => {
  const Mentions = TreeDom.render(mentionsData)

  return <Mentions />
}
