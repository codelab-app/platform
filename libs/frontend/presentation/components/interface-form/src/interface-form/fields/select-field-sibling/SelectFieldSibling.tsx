'use client'

import type { IFieldModel, ITypeModel } from '@codelab/frontend/abstract/domain'
import type { SelectFieldProps } from 'uniforms-antd'

import { connectField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

export type SelectFieldSiblingProps = SelectFieldProps & {
  siblings: Array<IFieldModel<ITypeModel>>
}

export const SelectFieldSibling = connectField(
  ({ name, siblings, ...props }: SelectFieldSiblingProps) => {
    const options = siblings.map(({ id, key, name: fieldName }) => ({
      label: fieldName ?? key,
      value: id,
    }))

    return (
      <SelectField
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        name="id"
        options={options}
      />
    )
  },
  { initialValue: true, kind: 'node' },
)
