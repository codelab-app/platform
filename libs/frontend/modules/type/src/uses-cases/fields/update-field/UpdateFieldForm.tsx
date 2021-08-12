import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import {
  refetchGetTypeGraphQuery,
  UpdateFieldMutation,
  UpdateFieldMutationVariables,
  useUpdateFieldMutation,
} from '@codelab/shared/codegen/graphql'
import React, { useContext } from 'react'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { InterfaceContext } from '../../types'
import { updateFieldSchema, UpdateFieldSchemaType } from './updateFieldSchema'

export const UpdateFieldForm = (
  props: UniFormUseCaseProps<UpdateFieldSchemaType>,
) => {
  const {
    interface: { id: interfaceId },
  } = useContext(InterfaceContext)

  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useCrudModalMutationForm<
    UpdateFieldSchemaType,
    UpdateFieldMutation,
    UpdateFieldMutationVariables
  >({
    mutationOptions: {
      refetchQueries: [
        refetchGetTypeGraphQuery({ input: { where: { id: interfaceId } } }),
      ],
    },
    useMutationFunction: useUpdateFieldMutation,
    mapVariables: (formData, crudState) => ({
      input: {
        fieldId: crudState.updateId,
        updateData: {
          type: {
            existingTypeId: formData.typeId,
          },
          name: formData.name,
          key: formData.key,
          description: formData.description,
        },
      },
    }),
    entityType: EntityType.Field,
  })

  return (
    <FormUniforms<UpdateFieldSchemaType>
      onSubmit={handleSubmit}
      schema={updateFieldSchema as any}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating field',
      })}
      model={{
        name: metadata?.name,
        key: metadata?.key,
        typeId: metadata?.typeId,
        description: metadata?.description,
      }}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields fields={['key', 'name', 'description']} />
      <TypeSelect name={'typeId'} label={'Type'} />
    </FormUniforms>
  )
}
