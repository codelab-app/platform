import React from 'react'
import { modalData } from './Modal.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Modal',
}

export const Default = () => {
  const Modal = Renderer.components(modalData)

  return <Modal />
}
