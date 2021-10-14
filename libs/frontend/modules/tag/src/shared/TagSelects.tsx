import React from 'react'
import { SelectField } from 'uniforms-antd'
import { useGetTagsQuery } from '../use-cases/get-tags'

export type TagSelectProps = {
  name: string
  label: string
}

export const TagSelect = (props: TagSelectProps) => {
  const { data } = useGetTagsQuery()

  const tagOptions =
    data?.getTags?.map((i) => ({
      label: i.name,
      value: i.id,
    })) || []
  console.log({ tagOptions })

  return (
    <SelectField
      options={tagOptions}
      showSearch={true}
      optionFilterProp="label"
      {...props}
    />
  )
}
