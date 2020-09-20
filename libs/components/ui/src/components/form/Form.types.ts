import { Select } from '../select'
import { NodeReactDtoI } from '@codelab/shared/interface/node'
import { PropJsonValue, PropsFromKeys } from '@codelab/shared/interface/props'

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

  export type OptionConfig = [string, PropJsonValue]

  export interface CreateSelect {
    label: string
    name: string
    options: Array<OptionConfig>
  }

  export const createSelect = ({
    label,
    name,
    options,
  }: CreateSelect): NodeReactDtoI<Select.Props | Form.ItemProps> => ({
    type: 'React.Form.Item',

    props: {
      label,
      name,
    },
    children: [
      {
        type: 'React.Select',

        props: {
          style: {
            width: 120,
          },
        },
        children: Form.createOptions(options),
      },
    ],
  })

  export const createOptions = (
    options: Array<OptionConfig>,
  ): Array<NodeReactDtoI<Select.OptionProps>> =>
    options.map(([key, value]: [string, PropJsonValue]) => ({
      type: 'React.Select.Option',

      props: {
        value,
      },
      children: [
        {
          type: 'React.Text',

          props: {
            value: key,
          },
        },
      ],
    }))
}
