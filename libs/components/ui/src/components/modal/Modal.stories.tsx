import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { modalData } from './Modal.data'

export default {
  title: 'Modal',
}

export const Default = () => {
  const Modal = TreeDom.render(modalData)

  return <Modal />
}
