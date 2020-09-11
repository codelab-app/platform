import { PropsFromKeys } from '@codelab/shared/interface/props'

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
}
