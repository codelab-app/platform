import { PropsFromKeys } from '@codelab/shared/interface/props'
import { ReactNodeI } from '@codelab/shared/interface/node'
import { Select } from '../select'

export namespace Form {
  export const propKeys = [
    'component',
    'colon',
    'fields',
    'form',
    'hideRequiredMark',
    'initialValues',
    'labelAlign',
    'labelCol',
    'layout',
    'name',
    'preserve',
    'scrollToFirstError',
    'size',
    'validateMessages',
    'validateTrigger',
    'wrapperCol',
    'onFinish',
    'onFinishFailed',
    'onFieldsChange',
    'onValuesChange',
  ] as const

  export const itemPropKeys = [
    'colon',
    'dependencies',
    'extra',
    'getValueFromEvent',
    'getValueProps',
    'hasFeedback',
    'help	',
    'htmlFor',
    'initialValue',
    'noStyle',
    'label',
    'labelAlign',
    'labelCol',
    'name',
    'normalize',
    'preserve',
    'required',
    'rules',
    'shouldUpdate',
    'trigger',
    'validateFirst',
    'validateStatus',
    'validateTrigger',
    'valuePropName',
    'wrapperCol',
    'hidden',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type ItemProps = PropsFromKeys<typeof itemPropKeys[number]>

  export type OptionConfig<T = unknown> = [string, T]

  export interface CreateSelect<T = unknown> {
    label: string
    name: string
    options: OptionConfig<T>[]
  }

  export const createSelect = <T = unknown>({
    label,
    name,
    options,
  }: CreateSelect<T>): ReactNodeI<Select.Props | Form.ItemProps> => ({
    type: 'Form.Item',
    nodeType: 'React',
    props: {
      label,
      name,
    },
    children: [
      {
        type: 'Select',
        nodeType: 'React',
        props: {
          style: {
            width: 120,
          },
        },
        children: Form.createOptions<T>(options),
      },
    ],
  })

  export const createOptions = <T = unknown>(
    options: OptionConfig<T>[],
  ): Array<ReactNodeI<Select.OptionProps>> =>
    options.map(([key, value]: [string, any]) => ({
      type: 'Select.Option',
      nodeType: 'React',
      props: {
        value,
      },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: key,
          },
        },
      ],
    }))
}
