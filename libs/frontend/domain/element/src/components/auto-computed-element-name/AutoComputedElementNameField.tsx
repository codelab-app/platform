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
  onChange: (value: string) => void
  computeElementNameService: IComputeElementNameService
}

/**
 * This component helps providing the computeElementNameService with
 * the user input as well as connect the parent form with the final
 * result from the computeElementNameService.
 */
const AutoComputedElementName = observer<AutoComputedElementNameProps>(
  (props) => {
    const { name, onChange, computeElementNameService, value } = props

    useEffect(() => {
      computeElementNameService.setPickedName(value)
    }, [value])

    useEffect(() => {
      // When renderType changes, we need to programatically
      // change the name field based on the selected renderTypeName
      // but only if user did not changed the name
      if (!computeElementNameService.hasCustomName) {
        onChange(computeElementNameService.pickedName)
      }
    }, [computeElementNameService.pickedRenderTypeName])

    return <TextField name={name} />
  },
)

export const AutoComputedElementNameField = connectField(
  AutoComputedElementName,
  {
    kind: 'leaf',
  },
)
