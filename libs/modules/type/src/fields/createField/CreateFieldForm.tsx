import {
  CreateFieldMutation,
  CreateFieldMutationVariables,
  refetchGetTypeGraphQuery,
  useCreateFieldMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/shared'
import React, { useContext } from 'react'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../shared'
import { InterfaceContext } from '../../types'
import { createFieldSchema, CreateFieldSchemaObject } from './createFieldSchema'

export const CreateFieldForm = (
  props: UniFormUseCaseProps<CreateFieldSchemaObject>,
) => {
  const {
    interface: { id: interfaceId },
  } = useContext(InterfaceContext)

  const {
    handleSubmit,
    crudModal: { reset },
  } = useCrudModalMutationForm<
    CreateFieldSchemaObject,
    CreateFieldMutation,
    CreateFieldMutationVariables
  >({
    mutationOptions: {
      refetchQueries: [
        refetchGetTypeGraphQuery({ input: { where: { id: interfaceId } } }),
      ],
    },
    useMutationFunction: useCreateFieldMutation,
    mapVariables: (formData) => ({
      input: {
        interfaceId,
        type: {
          existingTypeId: formData.typeId,
        },
        name: formData.name,
        key: formData.key,
        description: formData.description,
      },
    }),
    entityType: EntityType.Field,
  })

  return (
    <FormUniforms<CreateFieldSchemaObject>
      onSubmit={handleSubmit}
      schema={createFieldSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating fields',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields omitFields={['typeId']} />
      <TypeSelect name="typeId" label={'Type'} />
    </FormUniforms>
  )
}
