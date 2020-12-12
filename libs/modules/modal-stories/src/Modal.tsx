import { Modal as AntdModal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import React, { PropsWithChildren } from 'react'

export type AppModalProps = ModalProps

export const Modal = ({
  children,
  ...props
}: PropsWithChildren<AppModalProps>) => {
  return <AntdModal {...props}>{children}</AntdModal>
}
