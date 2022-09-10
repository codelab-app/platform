import { DeleteFilled, PlusOutlined } from '@ant-design/icons'
import {
  IAnyType,
  IArrayType,
  IField,
  IFieldDTO,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import tw from 'twin.macro'

export interface ArrayFieldProps {
  field: IField<IArrayType>
  form: UseFormReturn
  renderItemField: (itemField: IFieldDTO, index: number) => React.ReactElement
}

const primitivesDefaults = {
  [IPrimitiveTypeKind.Boolean]: false,
  [IPrimitiveTypeKind.Float]: 0.0,
  [IPrimitiveTypeKind.Integer]: 0,
  [IPrimitiveTypeKind.String]: '',
}

const defaultValue = (type: IAnyType) => {
  switch (type.kind) {
    case ITypeKind.PrimitiveType:
      return primitivesDefaults[type.primitiveKind]
    case ITypeKind.ArrayType:
      return []
    case ITypeKind.EnumType:
      return type.allowedValues[0]
    default:
      return {}
  }
}

export const ArrayField = observer(
  ({ field, form, renderItemField }: ArrayFieldProps) => {
    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: field.key,
    })

    const itemType = field.type.current.itemType

    const createField = (id: string, index: number) => {
      return {
        key: `${field.key}.${index}`,
        type: itemType,
        id,
        description: field.description,
        name: `${field.key}.${index}`,
      }
    }

    return (
      <div css={tw`border-gray-500`}>
        {fields.map((subField, index) => (
          <div css={tw`flex m-1`} key={subField.id}>
            {renderItemField(createField(subField.id, index), index)}
            <Button icon={<DeleteFilled />} onClick={() => remove(index)} />
          </div>
        ))}
        <Button
          icon={<PlusOutlined />}
          onClick={() => append(defaultValue(itemType.current))}
        />
      </div>
    )
  },
)
