import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import {
  DeleteTagsInput,
  refetchGetTagsQuery,
  useDeleteTagsMutation,
} from '@codelab/shared/codegen/graphql'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { deleteTagsSchema } from './deleteTagsSchema'

export const DeleteTagsForm = (props: UniFormUseCaseProps<DeleteTagsInput>) => {
  const {
    crudModal: { reset, state },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.Tag,
    useMutationFunction: useDeleteTagsMutation,
    mutationOptions: { refetchQueries: [refetchGetTagsQuery()] },
    mapVariables: ({ ids }: DeleteTagsInput) => ({ input: { ids } }),
  })

  return (
    <FormUniforms<DeleteTagsInput>
      model={{ ids: state.deleteIds }}
      onSubmit={handleSubmit}
      schema={deleteTagsSchema}
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
