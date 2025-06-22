'use client'

import type { IFieldModel, ITypeModel } from '@codelab/frontend-abstract-domain'
import type { IRef } from '@codelab/shared-abstract-core'
import type { GuaranteedProps } from 'uniforms'

import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { connectField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

export type SelectFieldSiblingProps = GuaranteedProps<{ id: string }> & {
  field?: IFieldModel<ITypeModel>
}

export const SelectFieldSibling = connectField(
  ({ field, name, ...props }: SelectFieldSiblingProps) => {
    const { fieldDomainService } = useDomainStore()

    const options = [...fieldDomainService.fields.values()]
      .filter(({ api, id }) => {
        return field.api.id === api.id && field.id !== id
      })
      .map(({ id, name: fieldName }) => ({
        label: fieldName,
        value: id,
      }))

    return (
      <SelectField
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        name={name}
        onChange={(value) =>
          props.onChange((value ? { id: value } : null) as IRef)
        }
        optionFilterProp="label"
        options={options}
        value={props.value?.id}
      />
    )
  },
  { kind: 'leaf' },
)
