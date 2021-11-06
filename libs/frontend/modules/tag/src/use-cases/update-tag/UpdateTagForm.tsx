import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useUpdateTagMutation } from '../tag.endpoints'
import { UpdateTagSchema, updateTagSchema } from './updateTagSchema'

export const UpdateTagForm = (props: UniFormUseCaseProps<UpdateTagSchema>) => {
  const {
    crudModal: {
      reset,
      state: { metadata },
    },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.Tag,
    useMutationFunction: useUpdateTagMutation,
    mutationOptions: { refetchQueries: [] },
    mapVariables: ({ name }: UpdateTagSchema, state) => ({
      input: { data: { name }, id: state.updateId },
    }),
  })

  return (
    <FormUniforms<UpdateTagSchema>
      onSubmit={handleSubmit}
      schema={updateTagSchema}
      model={metadata}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating tag',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
