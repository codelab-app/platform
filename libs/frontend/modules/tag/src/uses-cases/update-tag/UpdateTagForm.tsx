import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { refetchGetTagsQuery } from '../get-tags/GetTags.api.graphql'
import { useUpdateTagMutation } from './UpdateTag.api.graphql'
import { UpdateTagSchema, updateTagSchema } from './updateTagSchema'

export const UpdateTagForm = (props: UniFormUseCaseProps<UpdateTagSchema>) => {
  const {
    crudModal: { reset },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.Tag,
    useMutationFunction: useUpdateTagMutation,
    mutationOptions: { refetchQueries: [refetchGetTagsQuery()] },
    mapVariables: ({ name }: UpdateTagSchema, state) => ({
      input: { data: { name }, id: state.updateId },
    }),
  })

  return (
    <FormUniforms<UpdateTagSchema>
      onSubmit={handleSubmit}
      schema={updateTagSchema}
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
