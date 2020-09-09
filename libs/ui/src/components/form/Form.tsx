import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form as AntForm, Space, Divider } from 'antd'
import React, { ReactNode, ReactElement } from 'react'
import { FieldData, FormListProps } from './Form.types'

export namespace Form {
  export const List: React.FC<FormListProps> = ({ children, ...props }) => {
    const { name, label } = props

    return (
      <>
        <Divider orientation="left">{label}</Divider>
        <AntForm.List name={name}>
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field: FieldData) => {
                  return (
                    <Space key={field.key} style={{ display: 'flex' }}>
                      {/* Need to cast to array, our Node will convert single children from array of length 1 to a non-array object */}
                      {React.Children.toArray(children).map((child: any) => {
                        console.log(field, field.name, child.props)

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
      </>
    )
  }

  export const ItemHook: React.FC<any> = ({ children, ...props }) => {
    const { shouldUpdate, shouldRender, ...restProps } = props

    return (
      <AntForm.Item noStyle shouldUpdate={shouldUpdate}>
        {(form) => {
          const hidden = shouldRender(form.getFieldsValue())

          return (
            <>
              {React.Children.toArray(children).map(
                (child: ReactElement, index: number) => {
                  return !hidden ? (
                    // eslint-disable-next-line react/no-array-index-key
                    <React.Fragment key={index}>
                      {React.cloneElement(child, {
                        ...restProps,
                      })}
                    </React.Fragment>
                  ) : null
                },
              )}
            </>
          )
        }}
      </AntForm.Item>
    )
  }
}
