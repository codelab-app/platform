import type { SelectOption } from '@codelab/frontend/abstract/types'
import type { SelectElementProps } from '@codelab/frontend/presentation/components/interface-form'
import type { IElementDto } from '@codelab/shared/abstract/core'

import { SelectChildElement } from '@codelab/frontend/presentation/components/interface-form'
import { connectField, useField, useForm } from 'uniforms'

type SelectLinkElementProps = Pick<
  SelectElementProps,
  'elementOptions' | 'targetElementId'
> & {
  name: string
}

export const SelectLinkElement = connectField(
  ({
    elementOptions,
    name,
    targetElementId,
    ...props
  }: SelectLinkElementProps) => {
    /**
     * When form state is updated, all that uses `useField` will be re-rendered
     */
    const [fieldProps] = useField<{
      value?: SelectOption
    }>(name, { value: undefined }, { absoluteName: true })

    const form = useForm<IElementDto>()
    const parentElementId = targetElementId ?? form.model.parentElement?.id

    if (!parentElementId) {
      return null
    }

    return (
      <SelectChildElement
        allowClear
        disableWhenOneOpt={false}
        elementOptions={elementOptions}
        targetElementId={parentElementId}
        // eslint-disable-next-line react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any
        {...(props as any)}
        onChange={(value) => {
          return fieldProps.onChange(
            value ? { label: value.name, value } : undefined,
          )
        }}
      />
    )
  },
)
