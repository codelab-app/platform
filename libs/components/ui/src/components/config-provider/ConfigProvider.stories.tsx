import React from 'react'
import { configProviderData } from './ConfigProvider.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'ConfigProvider',
}

export const ComponentSize = () => {
  const ConfigProvider = TreeDom.render(configProviderData)

  return <ConfigProvider />
}
