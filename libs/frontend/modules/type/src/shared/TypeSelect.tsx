import { IAnyType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { SelectField } from 'uniforms-antd'

interface Option {
  label: string
  value: string
}
export type CreateTypeOptions = (types?: Array<IAnyType>) => Array<Option>

export interface TypeSelectProps {
  types: Array<IAnyType>
  name: string
  label: string
  createTypeOptions?: CreateTypeOptions
}

const defaultCreateTypeOptions: CreateTypeOptions = (types) =>
  types?.map((t) => ({ label: t.name, value: t.id })) ?? []

export const TypeSelect = observer<TypeSelectProps>(
  ({ name, label, createTypeOptions, types }) => {
    const typeOptions = createTypeOptions
      ? createTypeOptions(types)
      : defaultCreateTypeOptions(types)

    return (
      <SelectField
        label={label}
        name={name}
        optionFilterProp="label"
        options={typeOptions}
        showSearch
      />
    )
  },
)
