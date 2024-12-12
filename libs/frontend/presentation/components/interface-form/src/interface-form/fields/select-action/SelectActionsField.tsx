'use client'

/* eslint-disable react/jsx-props-no-spreading */
import type { IRuntimeModel } from '@codelab/frontend/abstract/application'
import type { IRef } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { GuaranteedProps } from 'uniforms'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useFormContext } from '@codelab/frontend-presentation-components-form'
import { connectField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

type SelectActionField = GuaranteedProps<Nullable<Array<IRef>>>

/**
 * This happens because of how uniforms handles field nesting by default. When you use connectField, uniforms automatically tries to create a nested field structure by appending the field name to the parent field name
 */
export const SelectActionsField = connectField<SelectActionField>(
  ({ name, ...fieldProps }) => {
    console.log(name)

    return (
      <SelectField
        mode="multiple"
        name={name}
        {...fieldProps}
        // getPopupContainer={(triggerNode) => triggerNode.parentElement}
        // optionFilterProp="label"
        options={[]}
        showSearch
        value={[]}
      />
    )
  },
  {
    // This tells uniforms not to nest the field name
    kind: 'leaf',
  },
)
