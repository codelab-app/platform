'use client'

import type { IFieldModel, ITypeModel } from '@codelab/frontend-abstract-domain'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import type { IRef } from '@codelab/shared-abstract-core'
import type { GuaranteedProps } from 'uniforms'

import { connectField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

export type SelectFieldSiblingProps = GuaranteedProps<{ id: string }> & {
  siblings: Array<IFieldModel<ITypeModel>>
}

export const SelectFieldSibling = connectField(
  ({ field, name, ...props }: SelectFieldSiblingProps) => {
    const { fieldDomainService } = useDomainStore()

    const options = [...fieldDomainService.fields.values()]
      .filter(({ api, id }) => {
        return field.api.id === api.id && field.id !== id
      })
      .map(({ id, key, name: fieldName }) => ({
        label: fieldName || key,
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
        // null value is allowed, meaning it is the first field
        required={false}
        showSearch
        value={props.value?.id}
      />
    )
  },
  { initialValue: true, kind: 'node' },
)
