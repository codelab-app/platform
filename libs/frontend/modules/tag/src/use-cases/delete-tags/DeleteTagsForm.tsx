import { DeleteTagsInput } from '@codelab/frontend/abstract/codegen'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { DeleteTagsSchema, deleteTagsSchema } from './deleteTagsSchema'

export const DeleteTagsForm = (
  props: UniFormUseCaseProps<DeleteTagsSchema>,
) => {
  const {
    crudModal: { reset, state },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.Tag,
    useMutationFunction: useDeleteTagsMutation,
    mutationOptions: { refetchQueries: [refetchGetTagGraphsQuery()] },
    mapVariables: ({ ids }: DeleteTagsSchema) => ({ input: { ids } }),
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
