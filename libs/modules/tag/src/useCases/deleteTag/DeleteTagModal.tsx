import {
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
import { DeleteTagInput, DeleteTagSchema } from './deleteTagSchema'

type DeleteTagFormProps = UniFormUseCaseProps<DeleteTagInput>

export const DeleteTagForm = (props: DeleteTagFormProps) => {
  const {
    crudModal: {
      reset,
      state: { metadata },
    },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.Tag,
    useMutationFunction: useDeleteTagMutation,
    mutationOptions: { refetchQueries: [refetchGetTagsQuery()] },
    mapVariables: (_, state) => ({ input: { appId: state.deleteIds[0] } }),
  })

  return (
    <FormUniforms<DeleteTagInput>
      onSubmit={handleSubmit}
      schema={DeleteTagSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting app',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete app "{metadata?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
