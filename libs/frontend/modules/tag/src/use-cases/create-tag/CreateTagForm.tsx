import { CreateTagInput } from '@codelab/frontend/abstract/codegen'
import {
  DisplayIfField,
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { useGetTagsQuery } from '../../store/tagEndpoints'
import { createTagSchema } from './CreateTagSchema'

export type CreateTagFormProps = Omit<
  FormUniformsProps<CreateTagInput>,
  'schema'
>

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

export const CreateTagForm = (props: CreateTagFormProps) => {
  const { data: tags } = useGetTagsQuery()

  return (
    <FormUniforms<CreateTagInput> schema={createTagSchema} {...props}>
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
