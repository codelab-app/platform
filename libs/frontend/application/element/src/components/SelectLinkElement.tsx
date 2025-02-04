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
      />
    )
  },
)
