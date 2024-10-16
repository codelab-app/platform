import type { SelectElementProps } from '@codelab/frontend/presentation/components/interface-form'
import type { IElementDto } from '@codelab/shared/abstract/core'
import { SelectChildElement } from '@codelab/frontend/presentation/components/interface-form'
import { connectField, useForm } from 'uniforms'

type SelectLinkElementProps = Pick<
  SelectElementProps,
  'allElementOptions' | 'targetElementId'
> & {
  name: string
}

export const SelectLinkElement = connectField(
  ({
    allElementOptions,
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
        allElementOptions={allElementOptions}
        allowClear
        disableWhenOneOpt={false}
        targetElementId={parentElementId}
        // eslint-disable-next-line react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any
        {...(props as any)}
      />
    )
  },
)
