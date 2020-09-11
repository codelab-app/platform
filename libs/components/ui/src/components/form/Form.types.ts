import { StoreValue } from 'rc-field-form/lib/interface'
import { PropsFromKeys } from '@codelab/shared/interface/props'
import React from 'react'

export const formPropKeys = [
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

export const formItemPropKeys = [
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

export type FormProps = PropsFromKeys<typeof formPropKeys[number]>

export type FormItemProps = PropsFromKeys<typeof formItemPropKeys[number]>

// Copy because not exported from antd
export interface FieldData {
  name: number
  key: number
  fieldKey: number
}

export interface Operation {
  add: (defaultValue?: StoreValue) => void
  remove: (index: number) => void
  move: (from: number, to: number) => void
}

export interface AntFormListProps {
  name: string | number | Array<string | number>
  label: string
  children: Array<(fields: FieldData, operation: Operation) => React.ReactNode>
}

export type FormListProps = Omit<AntFormListProps, 'children'> & {
  children: React.ReactElement[]
}
