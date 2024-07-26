/* eslint-disable react/jsx-props-no-spreading */
import type { IRef } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import React from 'react'
import type { GuaranteedProps } from 'uniforms'
import { connectField } from 'uniforms'
import { SelectAction } from './SelectAction'

export const SelectActionField = connectField(
  (fieldProps: GuaranteedProps<Nullable<IRef>>) => {
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
