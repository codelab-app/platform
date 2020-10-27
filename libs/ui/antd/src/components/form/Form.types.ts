import {
  PropJsonValue,
  PropTypeValue,
  PropsFromKeys,
} from '@codelab/shared/interface/props'

const propKeys = [
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

const itemPropKeys = [
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

export namespace Form {
  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type ItemProps = PropsFromKeys<typeof itemPropKeys[number]>

  export type OptionConfig = [string, PropJsonValue]

  export interface CreateSelect {
    label: string
    name: string
    options: Array<OptionConfig>
    showSearch?: boolean
    filterOption?: PropTypeValue
  }
}
