import React from 'react'
import { configProviderData } from './ConfigProvider.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'ConfigProvider',
  parameters: {
    data: {
      Default: configProviderData,
    },
  },
}

export const ComponentSize = () => {
  const ConfigProvider = Renderer.components(configProviderData)

  return <ConfigProvider />
}
