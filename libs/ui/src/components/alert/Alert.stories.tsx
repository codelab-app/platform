import React from 'react'
import { alertData } from './Alert.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Alert',
}

export const Default = () => {
  const Alert = TreeDom.render(alertData)

  return <Alert />
}
