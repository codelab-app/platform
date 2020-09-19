import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { alertData } from './Alert.data'

export default {
  title: 'Alert',
}

export const Default = () => {
  const Alert = TreeDom.render(alertData)

  return <Alert />
}
