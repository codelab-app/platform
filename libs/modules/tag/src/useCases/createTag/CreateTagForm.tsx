import {
  CreateTagInput,
  refetchGetTagsQuery,
  useCreateTagMutation,
  useGetTagsQuery,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/shared'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { createTagSchema } from './createTagSchema'

export const CreateTagForm = (props: UniFormUseCaseProps<CreateTagInput>) => {
  const {
    crudModal: { reset },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.Tag,
    useMutationFunction: useCreateTagMutation,
    mutationOptions: { refetchQueries: [refetchGetTagsQuery()] },
    mapVariables: (input: CreateTagInput) => ({ input }),
  })

  const { data: tags } = useGetTagsQuery()

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
      <AutoFields omitFields={['parentTagId']} />
      <SelectField
        name="parentTagId"
        label="Tag"
        showSearch={true}
        optionFilterProp="label"
        options={tags?.getTags.map((tag) => ({
          label: tag.name,
          value: tag.id,
        }))}
      />
    </FormUniforms>
  )
}
