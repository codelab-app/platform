import type { SubmitController } from '@codelab/frontend/abstract/types'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ModalProps as AntModalProps } from 'antd/lib/modal'
import AntdModal from 'antd/lib/modal'
import type { PropsWithChildren } from 'react'
import React, { useRef, useState } from 'react'
import { handleSubmitRefModalOk } from '../components/utils'
import { ModalFormContext } from './ModalForm.Context'

export type ModalProps = Pick<
  AntModalProps,
  | 'okButtonProps'
  | 'cancelButtonProps'
  | 'onOk'
  | 'okText'
  | 'onCancel'
  | 'open'
  | 'className'
  | 'title'
>

export const Modal = ({
  cancelButtonProps,
  children,
  className,
  okButtonProps,
  okText,
  onCancel,
  onOk,
  open,
}: PropsWithChildren<ModalProps>) => {
  const [isLoading, setIsLoading] = useState(false)
  // This is the controller that will do the form submission, create by the modal and passed down to the form
  const submitRef = useRef<Maybe<SubmitController>>()

  return (
    <ModalFormContext.Provider value={{ isLoading, setIsLoading, submitRef }}>
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
        open={open}
      >
        {children}
      </AntdModal>
    </ModalFormContext.Provider>
  )
}
