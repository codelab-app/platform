import {
  DeleteTagInput,
  refetchGetTagsQuery,
  useDeleteTagMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/shared'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { deleteTagSchema } from './deleteTagSchema'

export const DeleteTagForm = (props: UniFormUseCaseProps<DeleteTagInput>) => {
  const {
    crudModal: { reset },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.Tag,
    useMutationFunction: useDeleteTagMutation,
    mutationOptions: { refetchQueries: [refetchGetTagsQuery()] },
    mapVariables: ({ id }: DeleteTagInput) => ({ input: { id } }),
  })

  return (
    <FormUniforms<DeleteTagInput>
      onSubmit={handleSubmit}
      schema={deleteTagSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting tag',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
