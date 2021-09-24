import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  DisplayIfField,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import { CreateTagInput } from '@codelab/shared/codegen/graphql'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { refetchGetTagGraphQuery } from '../get-tag-graph/GetTagGraph.web.graphql.gen'
import { useGetTagsQuery } from '../get-tags/GetTags.web.graphql.gen'
import { useCreateTagMutation } from './CreateTag.web.graphql.gen'
import { createTagSchema } from './CreateTagSchema'

export interface CreateTagFormProps
  extends UniFormUseCaseProps<CreateTagInput> {
  parentTagId?: string
}

export const DisplayIfNotRoot = ({
  children,
}: React.PropsWithChildren<any>) => (
  <DisplayIfField<CreateTagInput> condition={(c) => !!c.model.parentTagId}>
    {children}
  </DisplayIfField>
)

export const CreateTagForm = ({
  parentTagId,
  ...props
}: CreateTagFormProps) => {
  const {
    crudModal: { reset },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.Tag,
    useMutationFunction: useCreateTagMutation,
    mutationOptions: { refetchQueries: [refetchGetTagGraphQuery()] },
    mapVariables: (input: CreateTagInput) => {
      return { input }
    },
  })

  const { data: tags } = useGetTagsQuery()

  return (
    <FormUniforms<CreateTagInput>
      model={{ parentTagId }}
      onSubmit={handleSubmit}
      schema={createTagSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating tag',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields omitFields={['parentTagId']} />
      <DisplayIfNotRoot>
        <SelectField
          required
          name="parentTagId"
          label="Parent Tag"
          showSearch={true}
          optionFilterProp="label"
          options={tags?.getTags.map((tag) => ({
            label: tag.name,
            value: tag.id,
          }))}
        />
      </DisplayIfNotRoot>
    </FormUniforms>
  )
}
