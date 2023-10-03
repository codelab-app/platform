/* eslint-disable react/jsx-props-no-spreading */
import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import React from 'react'
import type { GuaranteedProps } from 'uniforms'
import { connectField } from 'uniforms'
import { SelectAction } from './SelectAction'

export const SelectActionField = connectField(
  (fieldProps: GuaranteedProps<Nullable<IEntity>>) => {
    return (
      <SelectAction
        {...fieldProps}
        name="id"
        onChange={(value) =>
          fieldProps.onChange((value ? { id: value } : null) as IEntity)
        }
        required={false}
        value={fieldProps.value?.id}
      />
    )
  },
)
