import React from 'react'
import { modalData } from './Modal.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Modal',
  parameters: {
    data: {
      Default: modalData,
    },
  },
}

export const Default = () => {
  const Modal = Renderer.components(modalData)

  return <Modal />
}
