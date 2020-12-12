import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import React, { PropsWithChildren } from 'react'

export type AppModalProps = ModalProps

export const AppModal = ({
  children,
  ...props
}: PropsWithChildren<AppModalProps>) => {
  return <Modal {...props}>{children}</Modal>
}
