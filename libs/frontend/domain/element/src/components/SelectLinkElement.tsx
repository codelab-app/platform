import type { ICreateElementData } from '@codelab/frontend/abstract/core'
import type { SelectElementProps } from '@codelab/frontend/domain/type'
import { SelectChildElement } from '@codelab/frontend/domain/type'
import { observer } from 'mobx-react-lite'
import { useForm } from 'uniforms'
import { AutoField } from 'uniforms-antd'

type SelectLinkElementProps = Pick<SelectElementProps, 'allElementOptions'> & {
  name: string
  required?: boolean
}

export const SelectLinkElement = observer(
  ({ allElementOptions, name, required }: SelectLinkElementProps) => {
    const form = useForm<ICreateElementData>()
    const parentElementId = form.model.parentElement?.id

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
          />
        )}
        name={name}
        required={required}
      ></AutoField>
    )
  },
)
