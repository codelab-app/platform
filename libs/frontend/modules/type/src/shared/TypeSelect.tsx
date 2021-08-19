import { useGetTypesQuery } from '@codelab/shared/codegen/graphql'
import React from 'react'
import { SelectField } from 'uniforms-antd'

// export type TypeSelectProps = Omit<Partial<SelectFieldProps>, 'options'>
export type TypeSelectProps = {
  name: string
  label: string
}

export const TypeSelect = (props: TypeSelectProps) => {
  const { data: types } = useGetTypesQuery()

  const typeOptions =
    types?.getTypes?.map((i) => ({
      label: i.name,
      value: i.id,
    })) || []

  return (
    <SelectField
      options={typeOptions}
      showSearch={true}
      optionFilterProp="label"
      {...props}
    />
  )
}
