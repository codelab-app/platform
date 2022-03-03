import { FormProps, SubmitController } from '@codelab/frontend/abstract/types'
import { callbackWithParams } from '@codelab/frontend/shared/utils'
import { Maybe } from '@codelab/shared/abstract/types'
import AntdModal, { ModalProps } from 'antd/lib/modal'
import React, {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Bridge } from 'uniforms'
import { AutoForm } from 'uniforms-antd'
import { connectUniformSubmitRef, createBridge } from '../hooks/uniformUtils'

interface ModalFormContext {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  submitRef: Maybe<MutableRefObject<Maybe<SubmitController>>>
}

const initialContext: ModalFormContext = {
  isLoading: false,
  setIsLoading: (isLoading: boolean) => {
    throw new Error('ModalFormContext is not initialized')
  },
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  submitRef: null!,
}

const Context = createContext(initialContext)

const Form = <TData, TResponse = unknown>({
  onSubmitSuccess = [],
  onSubmitError = [],
  autosave = false,
  schema,
  onSubmit = (model: TData) => Promise.resolve(),
  children,
  model,
  onChangeModel,
  onChange,
}: React.PropsWithChildren<
  Omit<FormProps<TData, TResponse>, 'submitRef'>
>): ReactElement => {
  const { submitRef, setIsLoading } = useContext(Context)

  const [bridge, setBridge] = useState(
    schema instanceof Bridge ? schema : createBridge(schema),
  )

  useEffect(() => {
    setBridge(schema instanceof Bridge ? schema : createBridge(schema))
  }, [schema])

  return (
    <AutoForm<TData>
      autosave={autosave}
      autosaveDelay={500}
      model={model}
      onChange={onChange}
      onChangeModel={onChangeModel}
      onSubmit={(formData) => {
        setIsLoading(true)

        const result = onSubmit(formData as TData)

        if (!result) {
          setIsLoading(false)

          return result
        }

        return result
          .then((r) => {
            if (r) {
              callbackWithParams(onSubmitSuccess, r)
            }
          })
          .catch((err) => {
            console.error(err)

            callbackWithParams(onSubmitError, err)
          })
          .finally(() => {
            setIsLoading(false)
          })
      }}
      ref={connectUniformSubmitRef(submitRef)}
      schema={bridge}
    >
      {children}
    </AutoForm>
  )
}

const Modal = ({
  okButtonProps,
  cancelButtonProps,
  children,
  onOk,
  ...props
}: PropsWithChildren<ModalProps>) => {
  const [isLoading, setIsLoading] = useState(false)
  // This is the controller that will do the form submission, create by the modal and passed down to the form
  const submitRef = useRef<Maybe<SubmitController>>()

  return (
    <Context.Provider value={{ isLoading, setIsLoading, submitRef }}>
      <AntdModal
        // This is needed, because otherwise form values persist even after closing the modal
        cancelButtonProps={{
          ...cancelButtonProps,
          disabled: isLoading,
        }}
        destroyOnClose
        okButtonProps={{
          // Pass down any button props we get from the modalProps prop
          ...okButtonProps,
          disabled: isLoading,
          loading: isLoading,
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
        {...props}
      >
        {children}
      </AntdModal>
    </Context.Provider>
  )
}

export const ModalForm = { Form, Modal }
