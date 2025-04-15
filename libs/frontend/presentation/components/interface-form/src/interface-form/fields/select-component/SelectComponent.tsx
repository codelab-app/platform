'use client'

import type { IRef } from '@codelab/shared-abstract-core'

/* eslint-disable react/jsx-props-no-spreading */
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { connectField, type GuaranteedProps } from 'uniforms'
import { SelectField } from 'uniforms-antd'

export type SelectComponentProps = GuaranteedProps<string> & {
  parentComponent?: IRef
}

/**
 * Parent will pass the complete dot notation path to the field
 *
 * e.g.
 *
 * name="childMapperComponent.id"
 */
export const SelectComponent = connectField(
  ({ parentComponent, ...props }: SelectComponentProps) => {
    const { componentDomainService } = useDomainStore()

    return (
      <SelectField
        {...props}
        optionFilterProp="label"
        options={componentDomainService.getSelectOptions(parentComponent)}
        showSearch
      />
    )
  },
  { kind: 'leaf' },
)
