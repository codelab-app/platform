import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import React, { PropsWithChildren, ReactElement, useRef } from 'react'
import GeneratedForm, { FormProps, SubmitController } from './generated-form'

export interface ModalFormProps<T extends object> {
  modalProps?: ModalProps
  formProps: Omit<FormProps<T>, 'hideSubmitButton' | 'submitControllerRef'>
}

const ModalForm = <T extends object>({
  modalProps: { okButtonProps, onOk, ...modalProps } = {},
  formProps,
  children,
}: PropsWithChildren<ModalFormProps<T>>): ReactElement => {
  const submitControllerRef = useRef<SubmitController | undefined>()

  return (
    <Modal
      destroyOnClose
      okButtonProps={{
        htmlType: 'submit',
        ...okButtonProps,
      }}
      onOk={(e) => {
        if (!submitControllerRef.current)
          throw new Error('Submit controller ref not initialized')

        submitControllerRef.current.submit()
        if (onOk) onOk(e)
      }}
      {...modalProps}
    >
      <GeneratedForm
        hideSubmitButton
        submitControllerRef={submitControllerRef}
        {...formProps}
      />

      {children}
    </Modal>
  )
}

export default ModalForm
