import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AutoFields } from 'uniforms-antd'
import { useCreateAppMutation } from '../appApi'
import { CreateAppInput, createAppSchema } from './createAppSchema'

export const CreateAppForm = (props: UniFormUseCaseProps<CreateAppInput>) => {
  const {
    crudModal: { reset },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.App,
    useMutationFunction: useCreateAppMutation,
    mutationOptions: { refetchQueries: [] },
    mapVariables: ({ name }: CreateAppInput) => ({ input: { name } }),
  })

  const dispatch = useDispatch()

  const onSubmitSuccess = async () => {
    reset()
  }

  return (
    <FormUniforms<CreateAppInput>
      onSubmit={handleSubmit}
      schema={createAppSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating app',
      })}
      onSubmitSuccess={onSubmitSuccess}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
