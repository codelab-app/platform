import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import {
  DeleteTagInput,
  refetchGetTagsQuery,
  useDeleteTagMutation,
} from '@codelab/shared/codegen/graphql'
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
