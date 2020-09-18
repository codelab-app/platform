import React from 'react'
import { providerData } from './Provider.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Provider',
}

export const Default = () => {
  const Button = TreeDom.render(providerData)

  return <Button />
}
