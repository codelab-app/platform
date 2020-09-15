import React from 'react'
import { providerData } from './Provider.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Provider',
}

export const Default = () => {
  const Button = TreeDom.render(providerData)

  return <Button />
}
