import { CreateTagInput } from '@codelab/frontend/abstract/codegen'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  DisplayIfField,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { useCreateTagMutation, useGetTagsQuery } from '../tag.endpoints'
import { createTagSchema } from './CreateTagSchema'

export interface CreateTagFormProps
  extends UniFormUseCaseProps<CreateTagInput> {
  parentTagId?: string | null
}

export const DisplayIfNotRoot = ({
  children,
}: React.PropsWithChildren<any>) => (
  <DisplayIfField<CreateTagInput>
    condition={(c) => {
      return !!c.model.parentTagId
    }}
  >
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
    mutationOptions: { refetchQueries: [] },
    mapVariables: (input: CreateTagInput) => {
      console.log(input)

      return { input }
    },
  })

  const { data: tags } = useGetTagsQuery()

  console.log(parentTagId)

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
