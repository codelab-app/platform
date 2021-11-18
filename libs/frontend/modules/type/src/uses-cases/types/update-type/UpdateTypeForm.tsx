import {
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import { TypeKind } from '@codelab/shared/abstract/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { AutoField, AutoFields } from 'uniforms-antd'
import { createNonUnionTypeOptionsForTypeSelect } from '../../../shared/createNonUnionTypeOptionsForTypeSelect'
import { typenameToTypeKind } from '../../../type-tree'
import { UpdateTypeSchema, updateTypeSchema } from './updateTypeSchema'

export const UpdateTypeForm = (
  props: Omit<FormUniformsProps<UpdateTypeSchema>, 'schema'>,
) => {
  const entity = useSelector((s) => s.type.entity)

  if (!entity) {
    return null
  }

  const kind = typenameToTypeKind(entity.__typename)

  return (
    <FormUniforms<UpdateTypeSchema> schema={updateTypeSchema} {...props}>
      <AutoFields fields={['name']} />

      {kind === TypeKind.UnionType && (
        <AutoField
          createTypeOptions={createNonUnionTypeOptionsForTypeSelect}
          name={'typeIdsOfUnionType'}
        />
      )}
      {kind === TypeKind.PrimitiveType && <AutoField name={'primitiveKind'} />}
      {kind === TypeKind.EnumType && <AutoField name={'allowedValues'} />}
    </FormUniforms>
  )
}
