import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Form as AntForm, Button, Space } from 'antd'
import { FormProps } from 'antd/lib/form'
import { StoreValue } from 'rc-field-form/lib/interface'
import React from 'react'
import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

// Copy because not exported from antd
export interface FieldData {
  name: number
  key: number
  fieldKey: number
}

export type OptionConfig = [string, object]
export interface CreateSelect {
  label: string
  name: string
  options: Array<OptionConfig>
  showSearch?: boolean
  filterOption?: object
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
            __type: [PropType.Leaf],
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
    showSearch,
    filterOption,
  }: CreateSelect): NodeI => {
    return {
      type: AtomType.ReactFormItem,
      props: {
        label,
        name,
      },
      children: [
        {
          type: AtomType.ReactSelect,
          props: {
            style: {
              width: '100%',
            },
            showSearch,
            filterOption,
          },
          children: CodelabForm.createOptions(options),
        },
      ],
    }
  }

  static createOptions = (options: Array<OptionConfig>): Array<NodeI> => {
    return options.map(([key, value]: [string, any]) => ({
      type: AtomType.ReactSelectOption,
      props: {
        value,
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: key,
          },
        },
      ],
    }))
  }
}
