'use client'

/* eslint-disable react/jsx-props-no-spreading */
import type { IRuntimeModel } from '@codelab/frontend-abstract-application'
import type { IRef } from '@codelab/shared-abstract-core'
import type { Nullable } from '@codelab/shared-abstract-types'
import type { GuaranteedProps } from 'uniforms'

import { connectField } from 'uniforms'

import { SelectAction } from './SelectAction'

type SelectActionFieldProps = GuaranteedProps<Nullable<IRef>> & {
  selectedNode?: Nullable<IRuntimeModel>
}
export const SelectActionField = connectField<SelectActionFieldProps>(
  (fieldProps) => {
    return (
      <SelectAction
        {...fieldProps}
        name="id"
        onChange={(value) =>
          fieldProps.onChange((value ? { id: value } : null) as IRef)
        }
        required={false}
        value={fieldProps.value?.id}
      />
    )
  },
)
