import React from 'react'
import { alertData } from './Alert.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Alert',
}

export const Default = () => {
  const Alert = TreeDom.render(alertData)

  return <Alert />
}
