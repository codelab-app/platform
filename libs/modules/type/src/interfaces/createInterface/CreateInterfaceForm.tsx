import {
  CreateInterfaceInput,
  refetchGetInterfacesQuery,
  useCreateInterfaceMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useMutationCrudForm,
} from '@codelab/frontend/shared'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { createInterfaceSchema } from './createInterfaceSchema'

export const CreateInterfaceForm = (
  props: UniFormUseCaseProps<CreateInterfaceInput>,
) => {
  const {
    handleSubmit,
    crudModal: { reset },
  } = useMutationCrudForm({
    mutationOptions: { refetchQueries: [refetchGetInterfacesQuery()] },
    useMutationFunction: useCreateInterfaceMutation,
    mapVariables: (submitData: CreateInterfaceInput) => ({
      input: { ...submitData },
    }),
    entityType: EntityType.Interface,
  })

  return (
    <FormUniforms<CreateInterfaceInput>
      onSubmit={handleSubmit}
      schema={createInterfaceSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating interfaces',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
