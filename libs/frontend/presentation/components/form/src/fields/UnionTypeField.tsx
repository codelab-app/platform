'use client'

import type {
  IUnionTypeModel,
  TypedProp,
} from '@codelab/frontend-abstract-domain'
import type { ITypeKind } from '@codelab/shared-abstract-core'
import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { GuaranteedProps } from 'uniforms'

import { PropKind } from '@codelab/frontend-abstract-domain'
import { Form } from 'antd'
import { joinName, useField } from 'uniforms'
import { AutoField } from 'uniforms-antd'

type UnionTypeFieldProps = GuaranteedProps<TypedProp> & {
  unionType: IUnionTypeModel
}

export const UnionTypeField = (props: UnionTypeFieldProps) => {
  const { name } = props
  const typeFieldName = joinName(name, 'type')
  const kindFieldName = joinName(name, 'kind')
  const [field, context] = useField<UnionTypeFieldProps, ITypeKind>(name, props)
  const [typeField] = useField<ObjectLike, ITypeKind>(typeFieldName, {})
  const [kindField] = useField<ObjectLike, ITypeKind>(kindFieldName, {})
  const activeValueFieldName = joinName(name, typeField.value)
  const unionType = field.unionType

  const typeToKind = unionType.typesOfUnionType
    .map((type) => ({ [type.current.id]: type.current.kind }))
    .reduce((all, current) => ({ ...all, ...current }), {})

  const onTypeChange = (value: string) => {
    context.onChange(name, {
      kind: typeToKind[value],
      propKind: PropKind.UnionTypeProp,
      type: value,
    })
  }

  return (
    <Form.Item label={field.label}>
      <AutoField name={typeFieldName} onChange={onTypeChange} />
      {kindField.value && <AutoField name={activeValueFieldName} />}
    </Form.Item>
  )
}
