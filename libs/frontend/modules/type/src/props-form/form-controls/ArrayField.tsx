import { DeleteFilled, PlusOutlined } from '@ant-design/icons'
import { IArrayType, IField } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import tw from 'twin.macro'
import { Field } from '../../store'

export interface ArrayFieldProps {
  field: IField
  form: UseFormReturn
  renderItemField: (itemField: IField, index: number) => React.ReactElement
}

export const ArrayField = observer(
  ({ field, form, renderItemField }: ArrayFieldProps) => {
    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: field.key,
    })

    const createField = (id: string, index: number) => {
      return new Field({
        key: `${field.key}.${index}`,
        type: (field.type.current as IArrayType).itemType,
        id,
        description: field.description,
        name: `${field.key}.${index}`,
      })
    }

    return (
      <div css={tw`border-gray-500`}>
        {fields.map((subField, index) => (
          <div css={tw`flex m-1`} key={subField.id}>
            {renderItemField(createField(subField.id, index), index)}
            <Button icon={<DeleteFilled />} onClick={() => remove(index)} />
          </div>
        ))}
        <Button icon={<PlusOutlined />} onClick={() => append({})} />
      </div>
    )
  },
)
