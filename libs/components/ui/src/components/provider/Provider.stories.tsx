import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { providerData } from './Provider.data'

export default {
  title: 'Provider',
}

export const Default = () => {
  const Button = TreeDom.render(providerData)

  return <Button />
}
