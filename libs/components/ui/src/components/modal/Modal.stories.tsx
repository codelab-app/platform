import React from 'react'
import { modalData } from './Modal.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Modal',
}

export const Default = () => {
  const Modal = TreeDom.render(modalData)

  return <Modal />
}
