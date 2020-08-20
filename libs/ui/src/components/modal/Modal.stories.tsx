import React from 'react'
import { modalData } from './Modal.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Modal',
}

export const Default = () => {
  const Modal = TreeDom.render(modalData)

  return <Modal />
}
