import type { IType } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { SelectField } from 'uniforms-antd'

interface Option {
  label: string
  value: string
}
export type CreateTypeOptions = (types?: Array<IType>) => Array<Option>

export interface TypeSelectProps {
  createTypeOptions?: CreateTypeOptions
  label: string
  name: string
}

const defaultCreateTypeOptions: CreateTypeOptions = (types) =>
  types?.map(({ id, name }) => ({ label: name, value: id })) ?? []

export const TypeSelect = observer<TypeSelectProps>(
  ({ createTypeOptions, label, name }) => {
    const { typeService } = useStore()

    const [{ error, result, status }, getTypes] = useAsync(() =>
      typeService.getAll(),
    )

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
