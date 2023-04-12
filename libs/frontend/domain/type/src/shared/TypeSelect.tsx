import type { IType } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import { useAsync } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useField } from 'uniforms'
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
    const [fieldProps] = useField<{ value?: string }>(name, {})

    const [{ error, result, status }, getTypes] = useAsync(() =>
      typeService.getAll(),
    )

    // On update mode, the current selected type can be used
    // to show the type name instead of showing just the id
    const currentType = fieldProps.value
      ? typeService.types.get(fieldProps.value)
      : undefined

    const typeOptions = createTypeOptions
      ? createTypeOptions(result)
      : defaultCreateTypeOptions(
          result ?? (currentType ? [currentType] : undefined),
        )

    return (
      <SelectField
        error={error}
        label={label}
        loading={status === 'loading'}
        name={name}
        onDropdownVisibleChange={async (open) => {
          if (open && status === 'not-executed') {
            await getTypes.execute()
          }
        }}
        optionFilterProp="label"
        options={typeOptions}
        showSearch
      />
    )
  },
)
