import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Space, Form as AntForm } from 'antd'
import { StoreValue } from 'rc-field-form/lib/interface'
import React from 'react'
import { PropsFromKeys } from '@codelab/props'

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
interface FieldData {
  name: number
  key: number
  fieldKey: number
}

interface Operation {
  add: (defaultValue?: StoreValue) => void
  remove: (index: number) => void
  move: (from: number, to: number) => void
}

interface AntFormListProps {
  name: string | number | Array<string | number>
  children: Array<(fields: FieldData, operation: Operation) => React.ReactNode>
}

export type FormListProps = Omit<AntFormListProps, 'children'> & {
  children: React.ReactElement[]
}

export namespace Form {
  export const List: React.FC<FormListProps> = ({ children, ...props }) => {
    const { name } = props

    return (
      <AntForm.List name={name}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field: FieldData) => {
                return (
                  <Space key={field.key} style={{ display: 'flex' }}>
                    {children.map((child, index) => {
                      return React.cloneElement(child, {
                        ...field,
                        ...child.props,
                        name: [field.name, child.props.name],
                        key: [field.name, child.props.name],
                      })
                    })}

                    <AntForm.Item key="Form-list--delete">
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name)
                        }}
                      />
                    </AntForm.Item>
                  </Space>
                )
              })}
              <AntForm.Item key="Form-list--add">
                <Button
                  onClick={() => {
                    add()
                  }}
                  type="dashed"
                  style={{ width: '100%' }}
                >
                  <PlusOutlined /> Add
                </Button>
              </AntForm.Item>
            </>
          )
        }}
      </AntForm.List>
    )
  }
}
