import type { IComputeElementNameService } from '@codelab/frontend/abstract/core'
import type { InputProps } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import type { FieldProps } from 'uniforms'
import { connectField } from 'uniforms'
import { TextField } from 'uniforms-antd'

type AutoComputedElementNameProps = FieldProps<
  string,
  Omit<InputProps, 'onReset'>
> & {
  defaultValue?: string
  onChange: (value: string) => void
  computeElementNameService: IComputeElementNameService
}

const AutoComputedElementName = observer<AutoComputedElementNameProps>(
  (props) => {
    const { name, onChange, computeElementNameService, defaultValue } = props

    useEffect(() => {
      computeElementNameService.setPickedName(defaultValue)
    }, [defaultValue, computeElementNameService])

    useEffect(() => {
      // Calls the params.onChange when the current value changes either
      // by user input or when the selected atom or component change
      onChange(computeElementNameService.computedName)
    }, [computeElementNameService.computedName, onChange])

    return (
      <TextField
        name={name}
        onChange={(newValue) =>
          computeElementNameService.setPickedName(newValue)
        }
        value={computeElementNameService.computedName}
      />
    )
  },
)

export const AutoComputedElementNameField = connectField(
  AutoComputedElementName,
  {
    kind: 'leaf',
  },
)
