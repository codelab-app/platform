'use client'

import type { IRef } from '@codelab/shared-abstract-core'

/* eslint-disable react/jsx-props-no-spreading */
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { connectField } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'

export type SelectComponentProps = SelectFieldProps & {
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
        name=""
        options={componentDomainService.getSelectOptions(parentComponent)}
      />
    )
  },
  { kind: 'leaf' },
)
