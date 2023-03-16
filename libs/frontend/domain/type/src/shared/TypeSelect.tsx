import type { UnboxArray } from '@codelab/shared/abstract/types'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import React from 'react'
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
  createTypeOptions?: CreateTypeOptions
  label: string
  name: string
}

const defaultCreateTypeOptions: CreateTypeOptions = (types) =>
  types?.map(({ id, name }) => ({ label: name, value: id })) ?? []

export const TypeSelect = observer<TypeSelectProps>(
  ({ createTypeOptions, label, name }) => {
    const [{ error, result, status }, getTypes] = useAsync(() => getAllTypes())

    const typeOptions = createTypeOptions
      ? createTypeOptions(result)
      : defaultCreateTypeOptions(result)

    useMountEffect(getTypes.execute)

    return (
      <SelectField
        error={error}
        label={label}
        loading={status === 'loading'}
        name={name}
        optionFilterProp="label"
        options={typeOptions}
        showSearch
      />
    )
  },
)
