import { FormProps } from '@codelab/frontend/abstract/types'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { Bridge } from 'uniforms'
import { AutoForm } from 'uniforms-antd'
import { handleFormSubmit } from '../components/utils'
import { connectUniformSubmitRef, createBridge } from '../hooks/uniformUtils'
import { ModalFormContext } from './ModalForm.Context'

/**
 * @param onSubmit The fact Uniform types this as `DeepPartial` causes a lot of issue.
 *
 * We don't actually want to use `DeepPartial` because we want to specific the correct shape.
 *
 * But using without `DeepPartial` causes some casting down the line
 */
export const Form = <TData, TResponse = unknown>({
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
  const { submitRef, setIsLoading } = useContext(ModalFormContext)

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
      onSubmit={handleFormSubmit<TData, TResponse>(
        onSubmit,
        setIsLoading,
        onSubmitSuccess,
        onSubmitError,
      )}
      ref={connectUniformSubmitRef(submitRef)}
      schema={bridge}
    >
      {children}
    </AutoForm>
  )
}
