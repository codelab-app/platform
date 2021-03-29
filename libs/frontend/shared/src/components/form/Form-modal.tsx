import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import React, {
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useRef,
} from 'react'
import { JsonSchemaFormProps, SubmitController } from './json-schema'

export interface ModalFormProps<TData extends object> {
  modalProps?: ModalProps
  renderForm: () => ReactElement<
    Pick<JsonSchemaFormProps<TData>, 'hideSubmitButton' | 'submitRef'>
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
  const submitRef = useRef<SubmitController | undefined>()

  const form = cloneElement(renderForm(), {
    hideSubmitButton: true, // No need for it, we use the Modal's button
    submitRef,
  })

  return (
    <Modal
      // This is needed, because otherwise form values persist even after closing the modal
      destroyOnClose
      okButtonProps={{
        htmlType: 'submit',
        // Pass down any button props we get from the modalProps prop
        ...okButtonProps,
      }}
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
      {...modalProps}
    >
      {form}

      {/* In case we need something else in the modal later on */}
      {children}
    </Modal>
  )
}
