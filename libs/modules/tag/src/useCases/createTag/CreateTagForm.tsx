import {
  CreateTagInput,
  refetchGetTagsQuery,
  useCreateTagMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/shared'
import { AutoFields } from 'uniforms-antd'
import { createTagSchema } from './createTagSchema'

export const CreateTagForm = (props: UniFormUseCaseProps<CreateTagInput>) => {
  const {
    crudModal: { reset },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.Tag,
    useMutationFunction: useCreateTagMutation,
    mutationOptions: { refetchQueries: [refetchGetTagsQuery()] },
    mapVariables: ({ name }: CreateTagInput) => ({ input: { name } }),
  })

  return (
    <FormUniforms<CreateTagInput>
      onSubmit={handleSubmit}
      schema={createTagSchema}
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
