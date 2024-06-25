import type { SelectElementProps } from '@codelab/frontend-application-type/interface-form'
import { SelectChildElement } from '@codelab/frontend-application-type/interface-form'
import type { IElementDto } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useForm } from 'uniforms'
import type { SelectFieldProps } from 'uniforms-antd'
import { AutoField } from 'uniforms-antd'

type SelectLinkElementProps = Pick<
  SelectElementProps,
  'allElementOptions' | 'targetElementId'
> & {
  name: string
  onChange?: SelectFieldProps['onChange']
  required?: boolean
}

export const SelectLinkElement = observer(
  ({
    allElementOptions,
    name,
    onChange,
    required,
    targetElementId,
  }: SelectLinkElementProps) => {
    const form = useForm<IElementDto>()
    const parentElementId = targetElementId ?? form.model.parentElement?.id

    if (!parentElementId) {
      return null
    }

    return (
      <AutoField
        component={(props: unknown) => (
          <SelectChildElement
            allElementOptions={allElementOptions}
            allowClear
            disableWhenOneOpt={false}
            targetElementId={parentElementId}
            // eslint-disable-next-line react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any
            {...(props as any)}
            // Somehow if `onChange` with undefined value is passed into the
            // uniform-antd SelectField it fails because it will still try to run the `onChange`
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(onChange ? { onChange } : {})}
          />
        )}
        name={name}
        required={required}
      ></AutoField>
    )
  },
)
