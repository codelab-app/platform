import type { UnboxArray } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'
import { SelectField } from 'uniforms-antd'
import type { GetTypesQuery } from '../graphql/get-type.endpoints.graphql.gen'
import { getAllTypes } from '../store'

interface Option {
  label: string
  value: string
}
export type CreateTypeOptions = (
  types?: Array<UnboxArray<GetTypesQuery[keyof GetTypesQuery]>>,
) => Array<Option>

export interface TypeSelectProps {
  name: string
  label: string
  createTypeOptions?: CreateTypeOptions
}

const defaultCreateTypeOptions: CreateTypeOptions = (types) =>
  types?.map(({ id, name }) => ({ label: name, value: id })) ?? []

export const TypeSelect = observer<TypeSelectProps>(
  ({ createTypeOptions, label, name }) => {
    const { error, loading, value } = useAsync(() => getAllTypes(), [])

    const typeOptions = createTypeOptions
      ? createTypeOptions(value)
      : defaultCreateTypeOptions(value)

    return (
      <SelectField
        error={error}
        label={label}
        loading={loading}
        name={name}
        optionFilterProp="label"
        options={typeOptions}
        showSearch
      />
    )
  },
)
