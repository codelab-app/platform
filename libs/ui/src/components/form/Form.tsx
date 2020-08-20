import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form as AntForm, Space } from 'antd'
import React from 'react'
import { FieldData, FormListProps } from './Form.types'

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
