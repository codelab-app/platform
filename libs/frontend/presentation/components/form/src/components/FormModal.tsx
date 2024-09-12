'use client'

import type {
  FormModalProps,
  SubmitController,
} from '@codelab/frontend/abstract/types'
import type { Maybe, ObjectLike } from '@codelab/shared/abstract/types'
import Modal from 'antd/lib/modal'
import type { PropsWithChildren } from 'react'
import { useRef } from 'react'

export const FormModal = <TData extends ObjectLike>({
  children,
  okButtonProps,
  okText,
  onCancel,
  onOk,
  open,
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
      onOk={(event) => {
        if (!submitRef.current) {
          throw new Error('Submit controller ref not initialized')
        }

        // Submits the form
        submitRef.current.submit()

        // Call the callback from the modalProps prop, if defined
        if (onOk) {
          onOk(event)
        }
      }}
      open={open}
    >
      {children({ submitRef })}
    </Modal>
  )
}
