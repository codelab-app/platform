import {
  FormModalProps,
  PropsWithRenderChildren,
  RenderChildren,
  SubmitController,
  SubmitRef,
} from '@codelab/frontend/abstract/props'
import { useHookWithRefCallback } from '@codelab/frontend/shared/utils'
import { Maybe } from '@codelab/shared/abstract/types'
import Modal, { ModalProps } from 'antd/lib/modal'
import React, {
  cloneElement,
  forwardRef,
  PropsWithChildren,
  ReactElement,
  useImperativeHandle,
  useRef,
} from 'react'

export const FormModal = <TData extends Record<string, unknown>>({
  okButtonProps,
  onOk,
  onCancel,
  okText,
  children,
  visible,
}: PropsWithChildren<FormModalProps<TData>>) => {
  // This is the controller that will do the form submission, create by the modal and passed down to the form
  const submitRef = useRef<Maybe<SubmitController>>()

  return (
    <Modal
      // This is needed, because otherwise form values persist even after closing the modal
      destroyOnClose
      okButtonProps={{
        htmlType: 'submit',
        // Pass down any button props we get from the modalProps prop
        ...okButtonProps,
      }}
      okText={okText}
      onCancel={onCancel}
      onOk={(e) => {
        if (!submitRef.current) {
          throw new Error('Submit controller ref not initialized')
        }

        // Submits the form
        submitRef.current.submit()

        // Call the callback from the modalProps prop, if defined
        if (onOk) {
          onOk(e)
        }
      }}
      visible={visible}
    >
      {children({ submitRef })}
    </Modal>
  )
}
