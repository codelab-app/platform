import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useCreateComponentMutation } from '../../componentEndpoints'
import {
  createComponentSchema,
  CreateComponentSchemaType,
} from './createComponentSchema'

type CreateComponentFormProps = UniFormUseCaseProps<CreateComponentSchemaType>

export const CreateComponentForm = (props: CreateComponentFormProps) => {
  const {
    handleSubmit,
    crudModal: { reset },
  } = useCrudModalMutationForm({
    entityType: EntityType.Component,
    useMutationFunction: useCreateComponentMutation,
    mapVariables: (submitData: CreateComponentSchemaType) => ({
      input: { ...submitData },
    }),
  })

  return (
    <FormUniforms<CreateComponentSchemaType>
      onSubmit={handleSubmit}
      schema={createComponentSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating component',
      })}
      onSubmitSuccess={() => {
        reset()
      }}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
