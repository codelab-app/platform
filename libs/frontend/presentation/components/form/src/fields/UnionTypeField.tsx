'use client'

import type {
  IUnionTypeModel,
  TypedProp,
} from '@codelab/frontend-abstract-domain'
import type { ITypeKind } from '@codelab/shared-abstract-core'
import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { GuaranteedProps, joinName, useField } from 'uniforms'

import { typedProp } from '@codelab/frontend-abstract-domain'
import { Form } from 'antd'
import { AutoField } from 'uniforms-antd'

type UnionTypeFieldProps = GuaranteedProps<TypedProp> & {
  unionType: IUnionTypeModel
  oneOf?: Array<ObjectLike>
}

export const UnionTypeField = (props: UnionTypeFieldProps) => {
  const { name } = props
  const typeFieldName = joinName(name, 'type')
  const valueFieldName = joinName(name, 'value')
  const [field, context] = useField<UnionTypeFieldProps, ITypeKind>(name, props)
  const [typeField] = useField<ObjectLike, string>(typeFieldName, props)
  const { unionType } = field
  const oneOf = field.oneOf?.map((schema) => schema.properties)

  const currentSchema = oneOf?.find(
    (schema) => schema.type.const === typeField.value,
  )

  const uniformsProps = currentSchema.value.uniforms ?? {}

  const typeToKind = unionType.typesOfUnionType
    .map((type) => ({ [type.current.id]: type.current.kind }))
    .reduce((all, current) => ({ ...all, ...current }), {})

  const onTypeChange = (value: string) => {
    context.onChange(
      name,
      typedProp({
        kind: typeToKind[value]!,
        type: value,
        value: undefined,
      }),
    )
  }

  return (
    <Form.Item label={field.label}>
      <AutoField name={typeFieldName} onChange={onTypeChange} />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <AutoField name={valueFieldName} {...uniformsProps} />
    </Form.Item>
  )
}
