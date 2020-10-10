import React from 'react'
import { alertData } from './Alert.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Alert',
}

export const Default = () => {
  const Alert = Renderer.components(alertData)

  return <Alert />
}
