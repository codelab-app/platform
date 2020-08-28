import React from 'react'
import { configProviderData } from './ConfigProvider.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'ConfigProvider',
}

export const ComponentSize = () => {
  const ConfigProvider = TreeDom.render(configProviderData)

  return <ConfigProvider />
}
