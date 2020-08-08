import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Space, Form as AntForm } from 'antd'
import { FormProps as AntFormProps } from 'antd/lib/form/Form'
import { FormItemProps as AntFormItemProps } from 'antd/lib/form/FormItem'
import { StoreValue } from 'rc-field-form/lib/interface'
import React from 'react'
// import { FormListProps as AntFormListProps } from 'antd/lib/form/FormList'

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

export type FormProps = AntFormProps

export interface FormItemProps extends AntFormItemProps {
  renderProps?: { field: FieldData; operation: Operation }
}

export type FormListProps = Omit<AntFormListProps, 'children'> & {
  children: React.ReactElement[]
}

export namespace Form {
  export const Default: React.FC<FormProps> = ({ children, ...props }) => {
    const { initialValues, ...rest } = props

    return (
      <AntForm initialValues={initialValues} {...rest}>
        {children}
      </AntForm>
    )
  }

  export const Item: React.FC<FormItemProps> = ({ children, ...props }) => {
    // console.log(props)

    // const { label, name, renderProps, ...rest } = props
    //
    // /**
    //  * Used for layout only
    //  */
    // if (!name) {
    //   return <AntForm.Item>{children}</AntForm.Item>
    // }
    //
    // // Convert name to array
    // const normalizedName = Array.isArray(name) ? name : [name]
    //
    // const itemName =
    //   renderProps?.field.name !== undefined
    //     ? [renderProps?.field.name, ...normalizedName]
    //     : normalizedName

    return <AntForm.Item {...props}>{children}</AntForm.Item>
  }

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
