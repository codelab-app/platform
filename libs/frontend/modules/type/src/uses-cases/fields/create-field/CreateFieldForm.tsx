import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React, { useContext } from 'react'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { InterfaceContext } from '../../types'
import { refetchGetTypeGraphQuery } from '../../types/get-type-graph/GetTypeGraph.api.graphql'
import { useCreateFieldMutation } from './CreateField.api.graphql'
import { CreateFieldSchema, createFieldSchema } from './createFieldSchema'

export const CreateFieldForm = (
  props: UniFormUseCaseProps<CreateFieldSchema>,
) => {
  const {
    interface: { id: interfaceId },
  } = useContext(InterfaceContext)

  const {
    handleSubmit,
    crudModal: { reset },
  } = useCrudModalMutationForm({
    mutationOptions: {
      refetchQueries: [
        refetchGetTypeGraphQuery({ input: { where: { id: interfaceId } } }),
      ],
    },
    useMutationFunction: useCreateFieldMutation,
    mapVariables: (formData: CreateFieldSchema) => ({
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
    <FormUniforms<CreateFieldSchema>
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
