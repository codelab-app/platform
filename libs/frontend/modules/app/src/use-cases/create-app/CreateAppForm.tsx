import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  FormUniforms,
  UniFormUseCaseProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useCreateAppMutation } from '../../store/appEndpoints'
import { useApp } from '../../store/useApp'
import { CreateAppInput, createAppSchema } from './createAppSchema'

export const CreateAppForm = (props: UniFormUseCaseProps<CreateAppInput>) => {
  const { setLoading, reset } = useApp()
  const [createApp] = useCreateAppMutation()

  const mapVariables = ({ name }: CreateAppInput) => ({
    variables: {
      input: {
        name,
      },
    },
  })

  const onSumbit = async (submittedData: CreateAppInput) => {
    setLoading(true)
    await createApp(mapVariables(submittedData))
    setLoading(false)
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating app',
  })

  return (
    <FormUniforms<CreateAppInput>
      onSubmit={onSumbit}
      schema={createAppSchema}
      onSubmitError={onSubmitError}
      onSubmitSuccess={reset}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
