import { SubmitController } from '@codelab/frontend/abstract/types'
import { Maybe } from '@codelab/shared/abstract/types'
import AntdModal, { ModalProps as AntModalProps } from 'antd/lib/modal'
import React, { PropsWithChildren, useRef, useState } from 'react'
import { handleSubmitRefModalOk } from '../components/utils'
import { ModalFormContext } from './ModalForm.Context'

export type ModalProps = Pick<
  AntModalProps,
  | 'okButtonProps'
  | 'cancelButtonProps'
  | 'onOk'
  | 'okText'
  | 'onCancel'
  | 'visible'
  | 'className'
  | 'title'
>

export const Modal = ({
  okButtonProps,
  cancelButtonProps,
  onOk,
  okText,
  onCancel,
  visible,
  className,
  children,
}: PropsWithChildren<ModalProps>) => {
  const [isLoading, setIsLoading] = useState(false)
  // This is the controller that will do the form submission, create by the modal and passed down to the form
  const submitRef = useRef<Maybe<SubmitController>>()

  return (
    <ModalFormContext.Provider
      value={{ isLoading: loading, setIsLoading, submitRef }}
    >
      <AntdModal
        cancelButtonProps={{
          ...cancelButtonProps,
          disabled: isLoading,
        }}
        className={className}
        // This is needed, because otherwise form values persist even after closing the modal
        destroyOnClose
        okButtonProps={{
          // Pass down any button props we get from the modalProps prop
          ...okButtonProps,
          disabled: isLoading,
          loading: isLoading,
        }}
        okText={okText}
        onCancel={onCancel}
        onOk={handleSubmitRefModalOk(submitRef, onOk)}
        visible={visible}
      >
        {children}
      </AntdModal>
    </ModalFormContext.Provider>
  )
}
