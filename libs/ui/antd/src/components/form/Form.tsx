import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Form as AntForm, Button, Space } from 'antd'
import { FormProps } from 'antd/lib/form'
import { StoreValue } from 'rc-field-form/lib/interface'
import React, { ReactElement } from 'react'
import { Select } from '../..'
import { Form } from './Form.types'
import { NodeReactI } from '@codelab/shared/interface/node'
import { PropJsonValue } from '@codelab/shared/interface/props'

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
  children: Array<React.ReactElement>
}

// Not used
const CustomForm: React.FC<FormProps> = ({ children, ...props }: any) => {
  const [antform] = AntForm.useForm()

  return (
    <AntForm {...props}>
      {React.Children.toArray(children).map((child: any, index: number) => {
        return React.cloneElement(child, {
          ...child.props,
          // eslint-disable-next-line react/no-array-index-key
          key: index,
          form: {
            __type: ['Leaf'],
            value: [antform],
          },
        })
      })}
      {/* <>{React.cloneElement(children, mergedProps)}</> */}
    </AntForm>
  )
}

const List: React.FC<FormListProps> = ({ children, ...props }) => {
  const { name, label } = props

  return (
    <AntForm.List name={name}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field: FieldData) => {
              return (
                <Space key={field.key} style={{ display: 'flex' }}>
                  {/* Need to cast to array, our Node will convert single children from array of length 1 to a non-array object */}
                  {React.Children.toArray(children).map((child: any) => {
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
            <Button
              onClick={() => {
                add()
              }}
              type="dashed"
              style={{ width: '100%' }}
            >
              <PlusOutlined /> Add
            </Button>
          </>
        )
      }}
    </AntForm.List>
  )
}

const ItemHook: React.FC<any> = ({ children, ...props }) => {
  const { shouldUpdate, shouldRender, ...restProps } = props

  return (
    <AntForm.Item noStyle shouldUpdate={shouldUpdate}>
      {(form) => {
        const hidden = shouldRender(form.getFieldsValue())

        return (
          <>
            {React.Children.toArray(children).map(
              (child: any, index: number) => {
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

export class CodelabForm {
  static Form = CustomForm

  static List = List

  static ItemHook = ItemHook

  static createSelect = ({
    label,
    name,
    options,
  }: Form.CreateSelect): NodeReactI<Select.Props | Form.ItemProps> => ({
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
            width: '100%',
          },
        },
        children: CodelabForm.createOptions(options),
      },
    ],
  })

  static createOptions = (
    options: Array<Form.OptionConfig>,
  ): Array<NodeReactI<Select.OptionProps>> =>
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
