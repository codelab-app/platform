'use client'

import type { IFieldModel, ITypeModel } from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import type { GuaranteedProps } from 'uniforms'

import { connectField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

export type SelectFieldSiblingProps = GuaranteedProps<{ id: string }> & {
  siblings: Array<IFieldModel<ITypeModel>>
}

export const SelectFieldSibling = connectField(
  ({ name, siblings, ...props }: SelectFieldSiblingProps) => {
    const options = siblings.map(({ id, name: fieldName }) => ({
      label: fieldName,
      value: id,
    }))

    return (
      <SelectField
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        name="id"
        onChange={(value) =>
          props.onChange((value ? { id: value } : null) as IRef)
        }
        optionFilterProp="label"
        options={options}
        showSearch
        value={props.value?.id}
      />
    )
  },
  { initialValue: true, kind: 'node' },
)
