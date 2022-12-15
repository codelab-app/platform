import { IAnyType } from '@codelab/frontend/abstract/core'
import { UnboxArray } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useQuery } from 'react-query'
import { SelectField } from 'uniforms-antd'
import { GetTypesQuery } from '../graphql/get-type.endpoints.graphql.gen'
import { getAllTypes } from '../store'

interface Option {
  label: string
  value: string
}
export type CreateTypeOptions = (
  types?: Array<UnboxArray<GetTypesQuery[keyof GetTypesQuery]>>,
) => Array<Option>

export interface TypeSelectProps {
  types: Array<IAnyType>
  name: string
  label: string
  createTypeOptions?: CreateTypeOptions
}

const defaultCreateTypeOptions: CreateTypeOptions = (types) =>
  types?.map((t) => ({ label: t.name, value: t.id })) ?? []

export const TypeSelect = observer<TypeSelectProps>(
  ({ name, label, createTypeOptions }) => {
    const { data, error, isLoading } = useQuery(
      'interface-form/select-type',
      () => getAllTypes(),
    )

    const typeOptions = createTypeOptions
      ? createTypeOptions(data)
      : defaultCreateTypeOptions(data)

    return (
      <SelectField
        error={error}
        label={label}
        loading={isLoading}
        name={name}
        optionFilterProp="label"
        options={typeOptions}
        showSearch
      />
    )
  },
)
