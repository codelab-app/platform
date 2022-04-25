import { TYPE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { SelectField } from 'uniforms-antd'
import { useGetAllTypesQuery } from '../hooks'

export type CreateTypeSelectOptions = (
  getTypesResult?: ReturnType<typeof useGetAllTypesQuery>,
) => Array<{ label: string; value: string }>

export type TypeSelectProps = {
  name: string
  label: string
  createTypeOptions?: CreateTypeSelectOptions
} & WithServices<TYPE_SERVICE>

const defaultCreateTypeOptions: CreateTypeSelectOptions = (getTypesResult) =>
  getTypesResult?.data?.map((i: any) => ({
    label: i.name,
    value: i.id,
  })) || []

export const TypeSelect = observer<TypeSelectProps>(
  ({ name, label, createTypeOptions, typeService }) => {
    const types = useGetAllTypesQuery(undefined, typeService)

    const typeOptions = createTypeOptions
      ? createTypeOptions(types)
      : defaultCreateTypeOptions(types)

    return (
      <SelectField
        label={label}
        loading={types.isLoading}
        name={name}
        optionFilterProp="label"
        options={typeOptions}
        showSearch
      />
    )
  },
)
