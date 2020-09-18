import { PropsFromKeys, PropJsonValue } from '@codelab/shared/interface/props'
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
  }: CreateSelect): ReactNodeI<Select.Props | Form.ItemProps> => ({
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
        children: Form.createOptions(options),
      },
    ],
  })

  export const createOptions = (
    options: Array<OptionConfig>,
  ): Array<ReactNodeI<Select.OptionProps>> =>
    options.map(([key, value]: [string, PropJsonValue]) => ({
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
