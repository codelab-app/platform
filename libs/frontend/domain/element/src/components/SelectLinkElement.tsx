import {
  SelectChildElement,
  SelectElementProps,
} from '@codelab/frontend/domain/type'
import { ICreateElementDTO } from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import { useForm } from 'uniforms'
import { AutoField } from 'uniforms-antd'

type SelectLinkElementProps = Pick<SelectElementProps, 'allElementOptions'> & {
  name: string
}

export const SelectLinkElement = observer(
  ({ allElementOptions, name }: SelectLinkElementProps) => {
    const form = useForm<ICreateElementDTO>()
    const parentElementId = form.model.parentElementId

    if (!parentElementId) {
      return null
    }

    return (
      <AutoField
        component={(props: any) => (
          <SelectChildElement
            allElementOptions={allElementOptions}
            allowClear
            disableWhenOneOpt={false}
            targetElementId={parentElementId}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(props as any)}
          />
        )}
        name={name}
      ></AutoField>
    )
  },
)
