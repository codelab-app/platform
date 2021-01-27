import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import React, {
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useRef,
} from 'react'
import { SubmitController } from './json-schema/JsonSchemaForm-ref'
import { JsonSchemaFormProps } from './json-schema/JsonSchemaForm.d'

export interface ModalFormProps<TData extends object> {
  modalProps?: ModalProps
  renderForm: () => ReactElement<
    Pick<JsonSchemaFormProps<TData>, 'hideSubmitButton' | 'submitControllerRef'>
  >
}

/**
 *
 * <ModalForm
      modalProps={{
        okText: 'Register',
        okButtonProps: {
          loading: user.state.value.guest?.signingUp === 'loading',
        },
        visible: Boolean(user.state.value.guest?.signingUp),
        onCancel: () => root.send('ON_MODAL_CANCEL'),
        onOk: () => root.send('ON_MODAL_OK'),
      }}
      renderForm={() => <RegisterUserForm />}
    />
 */
export const ModalForm = <TData extends object>({
  modalProps: { okButtonProps, onOk, ...modalProps } = {},
  renderForm,
  children,
}: PropsWithChildren<ModalFormProps<TData>>): ReactElement => {
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
