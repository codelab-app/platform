import { CreateTagInput } from '@codelab/frontend/abstract/codegen'
import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { useGetTagsQuery } from '../../store/tagEndpoints'
import { createTagSchema } from './CreateTagSchema'
import { DisplayIfNotRoot } from './DisplayIfNotRoot'
import { CreateTagFormProps } from './types'

export const CreateTagForm = (props: CreateTagFormProps) => {
  const { data } = useGetTagsQuery()

  const options = data?.getTags.map((tag) => ({
    label: tag.name,
    value: tag.id,
  }))

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
          options={options}
        />
      </DisplayIfNotRoot>
    </FormUniforms>
  )
}
