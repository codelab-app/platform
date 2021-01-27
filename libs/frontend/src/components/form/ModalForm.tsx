import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import React, {
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useRef,
} from 'react'
import { SubmitController } from './JsonSchemaForm-ref'
import { JsonSchemaFormProps } from './JsonSchemaForm.d'

export interface ModalFormProps<TFormData extends object> {
  modalProps?: ModalProps
  renderForm: () => ReactElement<
    Pick<
      JsonSchemaFormProps<TFormData>,
      'hideSubmitButton' | 'submitControllerRef'
    >
  >
}

export const ModalForm = <TFormData extends object>({
  modalProps: { okButtonProps, onOk, ...modalProps } = {},
  renderForm,
  children,
}: PropsWithChildren<ModalFormProps<TFormData>>): ReactElement => {
  // This is the controller that will do the form submission. Set by the GeneratedForm component
  const submitControllerRef = useRef<SubmitController | undefined>()

  const form = cloneElement(renderForm(), {
    hideSubmitButton: true, // No need for it, we use the Modal's button
    submitControllerRef,
  })

  return (
    <Modal
      destroyOnClose // This is needed, because otherwise form values persist even after closing the modal
      okButtonProps={{
        htmlType: 'submit',
        ...okButtonProps, // Pass down any button props we get from the modalProps prop
      }}
      onOk={(e) => {
        if (!submitControllerRef.current)
          throw new Error('Submit controller ref not initialized')

        submitControllerRef.current.submit() // Submits the form
        if (onOk) onOk(e) // Call the callback from the modalProps prop, if defined
      }}
      {...modalProps}
    >
      {form}

      {/* In case we need something else in the modal later on */}
      {children}
    </Modal>
  )
}
