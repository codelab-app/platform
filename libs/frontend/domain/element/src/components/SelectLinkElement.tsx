import type { ICreateElementData } from '@codelab/frontend/abstract/core'
import type { SelectElementProps } from '@codelab/frontend/domain/type'
import { SelectChildElement } from '@codelab/frontend/domain/type'
import noop from 'lodash/noop'
import { observer } from 'mobx-react-lite'
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
    // Somehow if `onChange` with undefined value is passed into the
    // uniform-antd SelectField it fails because it will still try to run the `onChange`
    onChange = noop,
    required,
    targetElementId,
  }: SelectLinkElementProps) => {
    const form = useForm<ICreateElementData>()
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
            onChange={onChange}
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
